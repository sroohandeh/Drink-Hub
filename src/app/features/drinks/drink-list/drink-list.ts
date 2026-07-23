import { Component, computed, inject, signal } from '@angular/core';
import { DrinkCard } from '../../../shared/ui/drink-card/drink-card';
import { Drink } from '../../../shared/models/drink';
import { DrinkApi } from '../data/drink-api';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-drink-list',
  imports: [DrinkCard, NgClass],
  templateUrl: './drink-list.html',
  styleUrl: './drink-list.css',
})
export class DrinkList {
  private api = inject(DrinkApi);

  drinks = signal<Drink[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  search = signal('');
  showFavorites = signal(false);

  filteredDrinks = computed(() => {
    const term = this.search().trim().toLowerCase();
    const onlyFav = this.showFavorites();
    return this.drinks().filter((drink) => {
      const matchesName = drink.name.toLowerCase().includes(term);
      const matchesFav = !onlyFav || drink.favorite;
      return matchesName && matchesFav;
    });
  });

  ngOnInit() {
    this.api.getDrinks().subscribe({
      next: (drinks) => {
        this.drinks.set(drinks);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('مشکلی در دریافت نوشیدنی‌ها پیش آمد.');
        this.loading.set(false);
      },
    });
  }

  toggleFavorites() {
    this.showFavorites.update((v) => !v);
  }

  onToggleFavorite(drink: Drink) {
    this.drinks.update((list) =>
      list.map((d) => (d.id === drink.id ? { ...d, favorite: !d.favorite } : d)),
    );
  }
}
