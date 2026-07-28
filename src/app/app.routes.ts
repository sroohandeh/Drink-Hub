
import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { DrinkList } from './features/drinks/drink-list/drink-list';
import { drinkResolver } from './features/drinks/data/drink-resolver';
import { DrinkDetail } from './features/drinks/drink-detail/drink-detail';
import { Login } from './features/auth/ui/login/login';
import { authGuard } from './core/guards/auth.guard';

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
        path: 'drinks/:id',
        component: DrinkDetail,
        resolve: { drink: drinkResolver },
        canActivate: [authGuard],
        data: { title: 'جزئیات نوشیدنی', requiresAuth: true },
      },
      {path: 'login', component: Login}
    ],
  },
];
