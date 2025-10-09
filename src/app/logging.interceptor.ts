import { HttpResponse, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError, switchMap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('Request:', {
    url: req.urlWithParams,
    method: req.method,
    headers: req.headers.keys().map(k => ({ [k]: req.headers.getAll(k) })),
    body: req.body
  })
  const started = Date.now();

  return next(req).pipe(
    
    tap(event => {
      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        console.log(`Request to ${req.urlWithParams} took ${elapsed} ms.`);
        console.log('Response:', {
          url: event.url,
          status: event.status,
          headers: event.headers.keys().map(k => ({ [k]: req.headers.getAll(k) })),
          body: event.body
        })
      }
    })
  );
};
