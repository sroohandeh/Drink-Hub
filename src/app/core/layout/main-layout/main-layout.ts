import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, ActivatedRoute, Router } from '@angular/router';
import { Token } from '../../services/token';
import { User } from '../../../features/auth/data/auth.models';
import { AuthActions } from '../../../features/auth/stores/auth.action';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUser } from '../../../features/auth/stores/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  tokenService = inject(Token);
  year = new Date().getFullYear();
  isLoggedIn = signal(false);
  userName = signal<string>('مهمان');
  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor() {}
  ngOnInit(): void {
    this.store
      .select(selectIsLoggedIn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.isLoggedIn.set(value));

    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.userName.set(user ? user.name : 'مهمان');
      });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
