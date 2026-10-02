import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <div class="card p-4">
          <h2 class="page-title">Student Registration</h2>

          @if (error) {
            <div class="alert alert-danger">{{ error }}</div>
          }

          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Full Name</label>
                <input class="form-control" formControlName="name"
                  [class.is-invalid]="form.controls.name.touched && form.controls.name.invalid">
                @if (form.controls.name.touched && form.controls.name.invalid) {
                  <div class="invalid-feedback">Name must contain at least 2 characters.</div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Student ID</label>
                <input class="form-control" formControlName="studentId"
                  [class.is-invalid]="form.controls.studentId.touched && form.controls.studentId.invalid">
                @if (form.controls.studentId.touched && form.controls.studentId.invalid) {
                  <div class="invalid-feedback">Student ID is required.</div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Email</label>
                <input class="form-control" type="email" formControlName="email"
                  [class.is-invalid]="form.controls.email.touched && form.controls.email.invalid">
                @if (form.controls.email.touched && form.controls.email.invalid) {
                  <div class="invalid-feedback">Enter a valid email.</div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Password</label>
                <input class="form-control" type="password" formControlName="password"
                  [class.is-invalid]="form.controls.password.touched && form.controls.password.invalid">
                @if (form.controls.password.touched && form.controls.password.invalid) {
                  <div class="invalid-feedback">Minimum 6 characters.</div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Department</label>
                <input class="form-control" formControlName="department">
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Phone</label>
                <input class="form-control" formControlName="phone">
              </div>
            </div>

            <button class="btn btn-primary" [disabled]="form.invalid || loading">
              {{ loading ? 'Creating...' : 'Create Account' }}
            </button>
            <a class="btn btn-link" routerLink="/login">Back to Login</a>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    studentId: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    department: [''],
    phone: ['']
  });

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.register(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: err => {
        this.error = err.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
