import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () =>
      import('./components/pages/landing-page/landing-page').then(c => c.LandingPage),
    canActivate: [authGuard],
    data: { guestOnly: true },
  },
  {
    path: 'authentication',
    loadComponent: () =>
      import('./components/pages/authentication/authentication').then(c => c.Authentication),
    canActivate: [authGuard],
    data: { guestOnly: true },
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/pages/categories/categories').then(c => c.Categories),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/pages/categories-details/categories-details').then(
            c => c.CategoriesDetails,
          ),
      },
    ],
  },
  {
    path: 'maintenance',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/pages/maintenance/maintenance').then(c => c.Maintenance),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/pages/maintenance-events/maintenance-events').then(
            c => c.MaintenanceEvents,
          ),
      },
    ],
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/pages/settings/settings').then(c => c.Settings),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
