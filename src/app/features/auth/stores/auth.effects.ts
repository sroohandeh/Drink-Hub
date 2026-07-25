import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Auth } from '../data/auth';

import { AuthActions } from './auth.action';
import { Token } from '../../../core/services/token';


@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(Auth);
  private tokenService = inject(Token);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.api.login({ email, password }).pipe(
          tap((res) => {
            this.tokenService.setToken(res.token);
            this.tokenService.setUser(res.user);
          }),
          map((res) => AuthActions.loginSuccess(res)),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err.message || 'Login failed' }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.api.logout().pipe(
          tap(() => this.tokenService.clear()),
          map(() => AuthActions.logoutSuccess())
        )
      )
    )
  );

  restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreSession),
      map(() => {
        const token = this.tokenService.getToken();
        const user = this.tokenService.getUser<any>();
        return AuthActions.restoreSessionSuccess({ user, token });
      })
    )
  );
}
