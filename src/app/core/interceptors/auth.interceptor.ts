import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {switchMap} from 'rxjs';
import {AuthService} from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (req.url.includes('/token'))
    return next(req);

  return authService.getAccessToken().pipe(

    switchMap(accessToken => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      return next(authReq);
    })
  );
}
