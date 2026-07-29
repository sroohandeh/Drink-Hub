import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drink } from '../../models/drink';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";
import { PricePipe } from "../../pipes/price-pipe";

@Component({
  selector: 'app-drink-card',
  imports: [NgClass, NgOptimizedImage, RouterLink, PricePipe],
  templateUrl: './drink-card.html',
  styleUrl: './drink-card.css',
})
export class DrinkCard {
  @Input() drink!: Drink;
  @Output() toggleFavorite = new EventEmitter<Drink>();
}
