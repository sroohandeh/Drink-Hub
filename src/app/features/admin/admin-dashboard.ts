import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { PricePipe } from '../../shared/pipes/price-pipe';
import { DrinkApi } from '../drinks/data/drink-api';
import { Drink } from '../../shared/models/drink';

@Component({
  selector: 'app-admin',
  imports: [PricePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  private api = inject(DrinkApi);

  drinks = signal<Drink[]>([]);
  totalDrinks = 0;
  favoriteCount = 0;
  herbalCount = 0;

  constructor() {}
  ngOnInit(): void {
    this.api.getDrinks().subscribe({
      next: (drinks) => {
        this.drinks.set(drinks);
        this.totalDrinks = drinks.length;
        this.favoriteCount = drinks.filter((d) => d.favorite).length;
        this.herbalCount = drinks.filter((d) => d.type === 'herbal').length;
      },
      error: (err) => {
        console.error('Admin dashboard error', err);
      },
    });
  }
}
