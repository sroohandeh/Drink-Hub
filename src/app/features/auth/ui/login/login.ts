import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectError, selectIsLoggedIn, selectLoading } from '../../stores/auth.selectors';
import { AuthActions } from '../../stores/auth.action';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    this.store
      .select(selectLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.loading.set(v));

    this.store
      .select(selectError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.error.set(v));

    this.store
      .select(selectIsLoggedIn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/drinks';
          this.router.navigateByUrl(redirectTo);
        }
      });
  }

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    this.store.dispatch(AuthActions.login({ email: email!, password: password! }));
  }
}
