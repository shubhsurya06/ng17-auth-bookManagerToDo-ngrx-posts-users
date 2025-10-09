import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // import authService
  const authService = inject(AuthService);

  // import router
  const router = inject(Router);

  // get token from authService localStorage
  const token = authService.getToken();

  req = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token
    }
  })

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('auth interceptor error:', error);
      if (error.status === 401) {
        // Attempt token refresh
        return authService.startTokenRefresh().pipe(
          switchMap((res: any) => {
            authService.saveToken(res.accessToken);
            authService.saveRefreshToken(res.refreshToken);
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            });
            authService.startSessionTimeout(1);
            return next(retryReq);
          }),
          catchError((error) => {
            authService.removeRefreshToken();
            authService.removeToken();
            router.navigate(['login']);
            
            return throwError(() => error);
          })
        )
      }

      if (error.status === 0) {
        console.log('Network error:', error);
      }

      return throwError(() => error);
    })
  );
};
