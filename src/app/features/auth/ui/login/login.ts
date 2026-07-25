import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectError, selectLoading } from '../../stores/auth.selectors';
import { AuthActions } from '../../stores/auth.action';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    this.store.select(selectLoading).subscribe(v => this.loading.set(v));
    this.store.select(selectError).subscribe(v => this.error.set(v));
  }

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    this.store.dispatch(AuthActions.login({ email: email!, password: password! }));
    this.router.navigate(['/'])

}

}
