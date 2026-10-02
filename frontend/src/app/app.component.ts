import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/dashboard">Student Activity</a>

        @if (auth.isLoggedIn()) {
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="nav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item"><a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/activities" routerLinkActive="active">Activities</a></li>
              @if (auth.isAdmin()) {
                <li class="nav-item"><a class="nav-link" routerLink="/students" routerLinkActive="active">Students</a></li>
              }
              <li class="nav-item"><a class="nav-link" routerLink="/registrations" routerLinkActive="active">Registrations</a></li>
            </ul>
            <span class="text-white me-3">{{ auth.getUser()?.name }}</span>
            <button class="btn btn-outline-light btn-sm" (click)="logout()">Logout</button>
          </div>
        }
      </div>
    </nav>

    <main class="container py-4">
      <router-outlet />
    </main>
  `
})
export class AppComponent {
  auth = inject(AuthService);

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
