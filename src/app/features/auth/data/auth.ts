import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './auth.models';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(body: LoginRequest): Observable<LoginResponse> {
    const ok = body.email === 'admin@demo.com' && body.password === '123456';

    if (!ok) {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
    }

    const response: LoginResponse = {
      user: {
        id: '1',
        name: 'Admin User',
        email: body.email,
        role: 'admin',
      },
      token: 'mock-jwt-token-123',
    };

    return of(response).pipe(delay(700));
  }

  logout(): Observable<boolean> {
    return of(true).pipe(delay(200));
  }
}
