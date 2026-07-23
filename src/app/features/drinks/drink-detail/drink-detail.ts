import { Component, inject, signal } from '@angular/core';
import { Drink } from '../../../shared/models/drink';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-drink-detail',
  imports: [NgClass],
  templateUrl: './drink-detail.html',
  styleUrl: './drink-detail.css',
})
export class DrinkDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  drink = signal<Drink | null>(null);

  ngOnInit() {
    const resolvedDrink = this.route.snapshot.data['drink'] as Drink | null;
    if (!resolvedDrink) {
      this.router.navigate(['/drinks']);
      return;
    }
    this.drink.set(resolvedDrink);
  }

  goBack() {
    this.router.navigate(['/drinks']);
  }
}
