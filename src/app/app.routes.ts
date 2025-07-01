import { Routes } from '@angular/router';

export const AppPaths = {
  auth: 'auth',
  account: 'account',
  home: '',
  notFound: 'not-found',
};

export const routes: Routes = [
  {
    path: AppPaths.auth,
    loadChildren: () => import('./features/auth/auth.route'),
  },
  {
    path: AppPaths.account,
    loadChildren: () => import('./features/layout/layout.routes'),
  },
  {
    path: AppPaths.home,
    redirectTo: AppPaths.auth,
    pathMatch: 'full',
  },
];
