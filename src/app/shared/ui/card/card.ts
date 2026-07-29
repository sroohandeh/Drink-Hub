import {  NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgTemplateOutlet],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  cardHeader = contentChild<TemplateRef<unknown>>('cardHeader');
  cardBody = contentChild<TemplateRef<unknown>>('cardBody');
  cardFooter = contentChild<TemplateRef<unknown>>('cardFooter');
}
