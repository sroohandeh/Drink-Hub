import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Token } from '../services/token';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const tokenService = inject(Token);
  const router = inject(Router);

  if (tokenService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
  return false;
};
