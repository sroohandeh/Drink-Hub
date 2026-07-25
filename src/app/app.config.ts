import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer } from './features/auth/stores/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './features/auth/stores/auth.effects';
import { authInterceptor } from './core/interceptors/auth.intercptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
     provideStore(),
    provideState('auth', authReducer),
    provideEffects([AuthEffects]),
    provideHttpClient(withInterceptors([authInterceptor])),

  ],
};
