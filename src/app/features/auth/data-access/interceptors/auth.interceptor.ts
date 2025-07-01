import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@shared/data-access/services/token/token.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '@environments/environment.development';

export const BasicAuthInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const addToken = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    return authService.getToken().pipe(
      switchMap((res) => {
        return next(addToken(request, res?.mfsResponseInfo?.token));
      }),
      catchError((err) => {
        tokenService.deleteTokenAndRedirect();
        return throwError(() => err);
      })
    );
  };

  if (
    tokenService.token &&
    req.url !==
      `${environment.apiUrl}/mfs-transaction-management/authManagement/get`
  ) {
    const modReq = addToken(req, tokenService?.token as string);

    return next(modReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err?.status === 401) {
          handle401Error(req, next);
        }
        return throwError(() => err);
      })
    );
  }
  return next(req);
};
