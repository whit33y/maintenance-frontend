import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'authentication',
    loadComponent: () =>
      import('./components/pages/authentication/authentication').then(m => m.Authentication),
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/pages/categories/categories').then(m => m.Categories),
  },
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./components/pages/maintenance/maintenance').then(m => m.Maintenance),
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/pages/settings/settings').then(m => m.Settings),
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'authentication',
  },
];
