import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({providedIn: 'root'})
export class AuthService {
   
    private _authStatus = signal<AuthStatus>('checking')
    private _user = signal<User | null >(null);
    private _token = signal < string | null> (null);

    private http = inject(HttpClient);
    
    // ✅ URL DIRECTA - SIN PROBLEMAS DE PATHS
    private baseUrl = 'http://localhost:3000/api';

    constructor() {
        console.log('🎯 AuthService initialized with URL:', this.baseUrl);
        this.checkAuthStatus();
    }

    isAuthenticated(): boolean {
        return this._authStatus() === 'authenticated';
    }

    private checkAuthStatus(): void {
        const token = localStorage.getItem('token');
        if (token) {
            this._token.set(token);
            this._authStatus.set('authenticated');
        } else {
            this._authStatus.set('not-authenticated');
        }
    }

    getToken(): string | null {
        return this._token();
    }

    logout(): void {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');
        localStorage.removeItem('token');
    }

    login(email: string, password: string): Observable<boolean>{
        const url = `${this.baseUrl}/auth/login`;
        
        console.log('🚀 === MAKING LOGIN REQUEST ===');
        console.log('🚀 URL:', url);
        console.log('🚀 Email:', email);
        
        return this.http.post<AuthResponse>(url, {
            email: email,
            password: password
        })
        .pipe(
            tap((resp) => {
                console.log('✅ Login successful!');
                this._user.set(resp.user);
                this._authStatus.set('authenticated');
                this._token.set(resp.token);
                localStorage.setItem('token', resp.token);
            }),
            map(() => true),
            catchError((error: any) => {
                console.error('❌ Login failed');
                console.error('❌ Error status:', error.status);
                console.error('❌ Error URL:', error.url);
                this._user.set(null);
                this._token.set(null);
                this._authStatus.set('not-authenticated');
                return of(false);
            })
        )
    }
}