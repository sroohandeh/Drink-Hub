import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'drinkType',
})
export class DrinkTypePipe implements PipeTransform {
  transform(type: 'hot' | 'cold' | 'fermented' | 'herbal'): string {
    switch (type) {
      case 'hot':
        return 'گرم';
      case 'cold':
        return 'سرد';
      case 'fermented':
        return 'تخمیری';
      case 'herbal':
        return 'گیاهی';
      default:
        return 'نامشخص';
    }
  }
}
