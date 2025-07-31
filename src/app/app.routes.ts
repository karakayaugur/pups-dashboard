import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '@app/layouts/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('@app/pages/public/sign-in/sign-in.page').then(
            (m) => m.SignInPage
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('@app/pages/public/not-found/not-found.page').then(
            (m) => m.NotFoundPage
          ),
      },
    ],
  },
];
