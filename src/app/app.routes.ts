
import { Routes } from '@angular/router';

export const routes: Routes = [

    {
    path: 'login',
    loadComponent: () =>
      import('./features/authentication/login/login.component')
        .then(m => m.LoginComponent)
  },

  // OTP Verification
  {
    path: 'verify-otp',
    loadComponent: () =>
      import('./features/authentication/otp-verification/otp-verification.component')
        .then(m => m.OtpVerificationComponent)
  },

  // Accounts Dashboard
  {
    path: 'accounts',
    loadComponent: () =>
      import('./features/accounts/account-dashboard/account-dashboard.component')
        .then(m => m.AccountDashboardComponent)
  },

  // Default route
  {
    path: '',
    redirectTo: 'verify-otp',
    pathMatch: 'full'
  },

  // Invalid route
  {
    path: '**',
    redirectTo: 'verify-otp'
  }

];
