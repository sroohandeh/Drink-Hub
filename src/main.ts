import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Store } from '@ngrx/store';
import { AuthActions } from './app/features/auth/stores/auth.action';

  bootstrapApplication(App, appConfig)
  .then((ref) => {
    const store = ref.injector.get(Store);
    store.dispatch(AuthActions.restoreSession());
  })
  .catch(err => console.error(err));
