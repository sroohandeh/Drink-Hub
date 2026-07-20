import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { DrinkList } from './features/drinks/drink-list/drink-list';

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
    ],
  },
];
