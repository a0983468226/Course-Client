
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// src/app/services/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {

    private accessTokenKey = 'access_token';
    private refreshTokenKey = 'refresh_token';
    private readonly STORAGE_KEY = 'loginData';

    constructor(private http: HttpClient) { }


    login(params: any) {
        return this.http.post('/api/auth/login', params);
    }

    refreshToken() {
        return this.http.post('/api/auth/refresh-token', {});
    }

    captcha() {
        return this.http.post('/api/auth/captcha', {});
    }

    // 存資料（例如token、user info）
    setLoginData(data: any): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    // 讀資料
    getLoginData(): any | null {
        const json = localStorage.getItem(this.STORAGE_KEY);
        return json ? JSON.parse(json) : null;
    }


    // 移除資料（登出）
    clearLoginData(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    setTokens(access: string, refresh: string) {
        localStorage.setItem(this.accessTokenKey, access);
        localStorage.setItem(this.refreshTokenKey, refresh);
    }

    setAccessToken(token: string) {
        localStorage.setItem(this.accessTokenKey, token);
    }

    getAccessToken() {
        return localStorage.getItem(this.accessTokenKey);
    }

    clearTokens() {
        localStorage.removeItem(this.accessTokenKey);
    }

    getRefreshToken() {
        return localStorage.getItem(this.refreshTokenKey);
    }

    logout() {
        this.http.post('/api/auth/captcha', {}).subscribe((data: any) => {
            if (data.success) {
                localStorage.removeItem(this.accessTokenKey);
                localStorage.removeItem(this.refreshTokenKey);
                this.clearLoginData();
                window.location.href = '/login'; // 導向登入頁
            }
        });

    }

    isLoggedIn(): boolean {
        return !!this.getAccessToken();
    }

    isTokenExpired(token: string): boolean {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        return (Math.floor(Date.now() / 1000)) > expiry;
    }
}

