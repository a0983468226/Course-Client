
// src/app/interceptors/jwt.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();
        console.log('[JwtInterceptor] Intercepted:', request.url);

        console.log('[token] :', token);
        if (token) {
            request = this.addToken(request, token);
        }

        return next.handle(request).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    // 401 代表 token 失效，嘗試 refresh token
                    return this.handle401Error(request, next);
                } else {
                    return throwError(() => err);
                }
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((res: any) => {
                    this.isRefreshing = false;
                    this.authService.setAccessToken(res.accessToken);
                    this.refreshTokenSubject.next(res.accessToken);
                    return next.handle(this.addToken(request, res.accessToken));
                }),
                catchError((err) => {
                    this.isRefreshing = false;
                    this.authService.logout(); // 清除資料，導向登入頁
                    return throwError(() => err);
                })
            );

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => next.handle(this.addToken(request, token!)))
            );
        }
    }
}

