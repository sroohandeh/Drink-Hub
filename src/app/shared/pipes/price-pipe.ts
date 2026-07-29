import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: number | null | undefined, currency: string = 'تومان'): string {
    if (value == null) return '-';
    return `${value.toLocaleString('fa-IR')} ${currency}`;
  }
}
