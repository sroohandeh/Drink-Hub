import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

import { inject } from '@angular/core';
import { Drink } from '../../../shared/models/drink';
import { DrinkApi } from './drink-api';

export const drinkResolver: ResolveFn<Drink | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<Drink | null> => {
  const api = inject(DrinkApi);
  const router = inject(Router);

  const id = route.paramMap.get('id');
  if (!id) {
    router.navigate(['/drinks']);
    return of(null);
  }

  return api.getDrinkById(id).pipe(
    catchError((err) => {
      console.error('Error in drinkResolver', err);
      router.navigate(['/drinks']);
      return of(null);
    }),
  );
};
