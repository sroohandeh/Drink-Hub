import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../features/auth/stores/auth.selectors';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);

  let allowed = false;

  store.select(selectIsLoggedIn).subscribe(v => {
    allowed = v;
  }).unsubscribe();

  if (allowed) return true;

  router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
  return false;
};
