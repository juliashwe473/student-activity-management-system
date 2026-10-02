import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'activities',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/activities.component').then(m => m.ActivitiesComponent)
  },
  {
    path: 'students',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./pages/students.component').then(m => m.StudentsComponent)
  },
  {
    path: 'registrations',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/registrations.component').then(m => m.RegistrationsComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
