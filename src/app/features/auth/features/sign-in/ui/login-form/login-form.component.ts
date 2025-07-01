import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from "@angular/core"
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { ButtonComponent } from "@shared/component/button/button.component"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { SubscriptionHandler } from "@app/shared/utils/subscription-handler"
import { AuthService } from '@app/features/auth/data-access/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AppPaths } from '@app/app.routes';
import { NgOptimizedImage } from '@angular/common';
import { AuthPaths } from '@auth/auth.route';
import { InputStyle } from '@shared/component/input/directive/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '@shared/component/error-message/error-message.component';
import { MatSnackbarConfig } from '@shared/utils/material-ui.utils';
export interface LogingFormInterface {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    InputStyle,
    ErrorMessageComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  AppPaths = AppPaths;
  AuthPaths = AuthPaths;
  loading = signal(false);
  message = signal('');

  subs = new SubscriptionHandler();

  ngOnDestroy(): void {
    this.subs.unSubscribe();
  }

  loginForm = new FormGroup({
    phone: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(11)],
    }),
    rememberMe: new FormControl<boolean>(true),
  });

  get phone() {
    return this.loginForm.get('phone');
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.subs.add = this.authService
      .sendOtp(this.phone?.value as string)
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          if (
            res.mfsCommonServiceResponse.mfsStatusInfo.status.includes(
              'Failure'
            )
          ) {
            this.snackBar.open(
              res.mfsCommonServiceResponse.mfsStatusInfo.errorDescription,
              'close',
              MatSnackbarConfig
            );

            this.message.set(
              res.mfsCommonServiceResponse.mfsStatusInfo.errorDescription
            );
          }

          this.router.navigate([AppPaths.auth, AuthPaths.verifyOtp], {
            queryParams: {
              phone: this.phone?.value as string,
            },
          });
        },
        error: (e) => {
          this.loading.set(false);
          this.message.set(e?.error?.message);
        },
      });
  }
}
