import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Token } from '../../services/token';
import { User } from '../../../features/auth/data/auth.models';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  tokenService = inject(Token);
  year = new Date().getFullYear();
  isLoggedIn = !!localStorage.getItem('pdh_token');
  user: User | null = this.tokenService.getUser();

  constructor() {
    console.log('user',this.user);
  }
}
