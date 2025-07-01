import { Routes } from '@angular/router';

export const AuthPaths = {
  register: 'register',
  login: 'login',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',
  verifyOtp: 'verify-otp',
};

export default [
  {
    path: '',
    redirectTo: AuthPaths.login,
    pathMatch: 'full',
  },
  {
    path: AuthPaths.login,
    loadComponent: () =>
      import('./features/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: AuthPaths.register,
    loadComponent: () =>
      import('./features/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: AuthPaths.forgotPassword,
    loadComponent: () =>
      import('./features/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: AuthPaths.resetPassword,
    loadComponent: () =>
      import('./features/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: AuthPaths.verifyOtp,
    loadComponent: () =>
      import('./features/verify-otp/verify-otp.component').then(
        (m) => m.VerifyOtpComponent
      ),
  },
] as Routes;
