import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Drink } from '../../../shared/models/drink';
import { isPlatformServer } from '@angular/common';
import drinksData from '../../../../assets/mocks/drinks.json'

@Injectable({
  providedIn: 'root',
})
export class DrinkApi {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  private readonly drinks: Drink[] = drinksData as Drink[];

  getDrinks(): Observable<Drink[]> {
    if (isPlatformServer(this.platformId)) {
      // در سرور: مستقیم از داده‌های ایمپورت‌شده استفاده کن
      return of(this.drinks).pipe(delay(500));
    } else {
      // در کلاینت: از HTTP استفاده کن (یا همان mock)
      return this.http.get<Drink[]>('assets/mocks/drinks.json').pipe(
        map((drinks) => drinks ?? []),
      );
    }
  }

  getDrinkById(id: string): Observable<Drink> {
    if (isPlatformServer(this.platformId)) {
      const found = this.drinks.find((drink) => drink.id === id);
      if (!found) {
        throw new Error('Drink not found');
      }
      return of(found).pipe();
    } else {
      return this.http.get<Drink[]>('assets/mocks/drinks.json').pipe(
        map((drinks) => {
          const found = drinks.find((drink) => drink.id === id);
          if (!found) {
            throw new Error('Drink not found');
          }
          return found;
        }),
      );
    }
  }
}
