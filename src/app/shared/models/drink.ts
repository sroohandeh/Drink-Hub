export interface Drink {
  id: string;
  name: string;
  type: 'hot' | 'cold' | 'fermented' | 'herbal';
  description: string;
  imageName: string;
  price: number;
  favorite: boolean;
  region: string;
}
