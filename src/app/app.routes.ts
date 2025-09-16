import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'authentication',
    loadComponent: () =>
      import('./components/pages/authentication/authentication').then(m => m.Authentication),
    canActivate: [authGuard],
    data: { guestOnly: true },
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/pages/categories/categories').then(m => m.Categories),
    canActivate: [authGuard],
  },
  {
    path: 'maintenance',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/pages/maintenance/maintenance').then(m => m.Maintenance),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/pages/maintenance-events/maintenance-events').then(
            m => m.MaintenanceEvents,
          ),
      },
    ],
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/pages/settings/settings').then(m => m.Settings),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'maintenance',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'maintenance',
  },
];
