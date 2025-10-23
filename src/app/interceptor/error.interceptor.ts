import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('An error occurred:', error);
      let status = error.status;

      switch(status) {
        case 400:
          console.error('Bad Request');
          break;
        case 401:
          console.error('Unauthorized');
          break;
        case 403:
          console.error('Forbidden');
          break;
        case 500:
          console.error('Internal Server Error');
          break;
        default:
          console.error(`Unhandled error status: ${status}`);
          break;
      }

      throw error;
    })
  );
};
