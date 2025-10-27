import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../../products/services/auth.service';

// Variables para manejar el refresh token
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  
  const token = authService.getToken();
  
  if (token) {
    request = addToken(request, token);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && token) {
        return handle401Error(request, next, authService);
      }
      return throwError(() => error);
    })
  );
};

// Función helper para agregar token
const addToken = (request: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Función helper para manejar error 401
const handle401Error = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((tokens: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(tokens.token);
        return next(addToken(request, tokens.token));
      }),
      catchError((error) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => error);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap(token => {
        return next(addToken(request, token));
      })
    );
  }
};