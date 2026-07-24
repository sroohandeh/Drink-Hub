import { Injectable } from '@angular/core';
const TOKEN_KEY = 'pdh_token';
const USER_KEY = 'pdh_user';

@Injectable({
  providedIn: 'root',
})
export class Token {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getUser<T>(): T | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  setUser(user: unknown) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
