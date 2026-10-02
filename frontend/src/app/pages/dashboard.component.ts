import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <section class="hero p-4 p-md-5 mb-4">
      <h1>Welcome, {{ auth.getUser()?.name }}!</h1>
      <p class="lead mb-0">Manage university students, activities and registrations.</p>
    </section>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card p-4 h-100">
          <h5>Activities</h5>
          <p class="display-6">{{ (activities$ | async)?.length || 0 }}</p>
          <a routerLink="/activities" class="btn btn-primary">View Activities</a>
        </div>
      </div>

      @if (auth.isAdmin()) {
        <div class="col-md-4">
          <div class="card p-4 h-100">
            <h5>Students</h5>
            <p class="display-6">{{ (students$ | async)?.length || 0 }}</p>
            <a routerLink="/students" class="btn btn-dark">Manage Students</a>
          </div>
        </div>
      }

      <div class="col-md-4">
        <div class="card p-4 h-100">
          <h5>Registrations</h5>
          <p class="display-6">{{ (registrations$ | async)?.length || 0 }}</p>
          <a routerLink="/registrations" class="btn btn-success">View Registrations</a>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private api = inject(ApiService);
  auth = inject(AuthService);

  activities$ = this.api.getActivities();
  students$ = this.auth.isAdmin() ? this.api.getStudents() : null;
  registrations$ = this.api.getRegistrations();
}
