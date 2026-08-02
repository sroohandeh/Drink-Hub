import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
const TOKEN_KEY = 'pdh_token';
const USER_KEY = 'pdh_user';

@Injectable({
  providedIn: 'root',
})
export class Token {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    if (!this.isBrowser) {
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  }

  clear(): void {
    if (!this.isBrowser) {
      return;
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getUser<T>(): T | null {
    if (!this.isBrowser) {
      return null;
    }
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  setUser(user: unknown): void {
    if (!this.isBrowser) {
      return;
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // getToken(): string | null {
  //   return localStorage.getItem(TOKEN_KEY);
  // }

  // setToken(token: string) {
  //   localStorage.setItem(TOKEN_KEY, token);
  // }

  // clear() {
  //   localStorage.removeItem(TOKEN_KEY);
  //   localStorage.removeItem(USER_KEY);
  // }

  // getUser<T>(): T | null {
  //   const raw = localStorage.getItem(USER_KEY);
  //   return raw ? (JSON.parse(raw) as T) : null;
  // }

  // setUser(user: unknown) {
  //   localStorage.setItem(USER_KEY, JSON.stringify(user));
  // }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
}
