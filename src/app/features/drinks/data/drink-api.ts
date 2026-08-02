import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { delay, map, Observable } from 'rxjs';
import { Drink } from '../../../shared/models/drink';

@Injectable({
  providedIn: 'root',
})
export class DrinkApi {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private get baseUrl(): string {
    return isPlatformBrowser(this.platformId)
      ? 'assets/mocks/drinks.json'
      : '/assets/mocks/drinks.json';
  }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.baseUrl).pipe(
      delay(500),
      map((drinks) => drinks ?? []),
    );
  }

  getDrinkById(id: string): Observable<Drink> {
    return this.http.get<Drink[]>(this.baseUrl).pipe(
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
