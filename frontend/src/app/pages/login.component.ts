import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card p-4">
          <h2 class="page-title mb-2">Login</h2>
          <p class="text-muted">Student Activity Management System</p>

          @if (error) {
            <div class="alert alert-danger">{{ error }}</div>
          }

          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input class="form-control" type="email" formControlName="email"
                [class.is-invalid]="form.controls.email.touched && form.controls.email.invalid">
              @if (form.controls.email.touched && form.controls.email.invalid) {
                <div class="invalid-feedback">Enter a valid email.</div>
              }
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input class="form-control" type="password" formControlName="password"
                [class.is-invalid]="form.controls.password.touched && form.controls.password.invalid">
              @if (form.controls.password.touched && form.controls.password.invalid) {
                <div class="invalid-feedback">Password is required.</div>
              }
            </div>

            <button class="btn btn-primary w-100" [disabled]="form.invalid || loading">
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <p class="mt-3 mb-0">No account? <a routerLink="/register">Register here</a></p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: err => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
