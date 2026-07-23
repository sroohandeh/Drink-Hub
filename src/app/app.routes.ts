
import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { DrinkList } from './features/drinks/drink-list/drink-list';
import { drinkResolver } from './features/drinks/data/drink-resolver';
import { DrinkDetail } from './features/drinks/drink-detail/drink-detail';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'drinks', pathMatch: 'full' },
      {
        path: 'drinks',
        component: DrinkList,
      },
      {
        path: 'drink/:id',
        component: DrinkDetail,
        resolve: { drink: drinkResolver },
        data: { title: 'جزییات نوشیدنی', requiresAuth: false },
      },
    ],
  },
];
