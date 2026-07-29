import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { DrinkCard } from '../../../shared/ui/drink-card/drink-card';
import { Drink } from '../../../shared/models/drink';
import { DrinkApi } from '../data/drink-api';
import { NgClass } from '@angular/common';
import { InfiniteScroll } from '../../../shared/directives/infinite-scroll';

@Component({
  selector: 'app-drink-list',
  imports: [DrinkCard, NgClass, InfiniteScroll],
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

  pageSize = signal(6);
  pageStep = 6;

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  filteredDrinks = computed(() => {
    const term = this.search().trim().toLowerCase();
    const onlyFav = this.showFavorites();
    return this.drinks().filter((drink) => {
      const matchesName = drink.name.toLowerCase().includes(term);
      const matchesFav = !onlyFav || drink.favorite;
      return matchesName && matchesFav;
    });
  });

  visibleDrinks = computed(() => {
    const all = this.filteredDrinks();
    return all.slice(0, this.pageSize());
  });

  canShowMore = computed(() => {
    return this.filteredDrinks().length > this.pageSize();
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
    this.pageSize.set(this.pageStep);
  }

  onToggleFavorite(drink: Drink) {
    this.drinks.update((list) =>
      list.map((d) => (d.id === drink.id ? { ...d, favorite: !d.favorite } : d)),
    );
  }

  onScrollEnd() {
    if (this.canShowMore()) {
      this.showMore();
    }
  }

  showMore() {
    this.pageSize.update((size) => size + this.pageStep);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchInput()?.nativeElement.focus();
    }, 0);
  }
}
