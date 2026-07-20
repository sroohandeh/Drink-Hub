import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-drink-list',
  imports: [],
  templateUrl: './drink-list.html',
  styleUrl: './drink-list.css',
})
export class DrinkList {
  drinks = signal<any[]>([]);

  hasData() {
    return this.drinks().length > 0;
  }
}
