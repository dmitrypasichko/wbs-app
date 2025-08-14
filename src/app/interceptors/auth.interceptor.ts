import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const access = auth.getAccessToken();
  if (access) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${access}` } });
  }
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && auth.getRefreshToken()) {
        return auth.refresh().pipe(
          switchMap(res => {
            auth.saveTokens(res);
            const retried = req.clone({ setHeaders: { Authorization: `Bearer ${res.accessToken}` } });
            return next(retried);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
