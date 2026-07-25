import { LoginRequest, LoginResponse, User } from "../data/auth.models";
import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<LoginRequest>(),
    'Login Success': props<LoginResponse>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Restore Session': emptyProps(),
    'Restore Session Success': props<{ user: User | null; token: string | null }>(),
  },
})
