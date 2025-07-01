import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@shared/component/button/button.component';
import { SubscriptionHandler } from '@app/shared/utils/subscription-handler';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppPaths } from '@app/app.routes';
import { NgOptimizedImage } from '@angular/common';
import { AuthPaths } from '@auth/auth.route';
import { ErrorMessageComponent } from '@shared/component/error-message/error-message.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatSnackbarConfig } from '@shared/utils/material-ui.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CountdownComponent,
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';

export interface LogingFormInterface {
  email: string;
  password: string;
}

@Component({
  selector: 'app-verify-otp-form',
  templateUrl: './verify-otp-form.component.html',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    MatInputModule,
    ErrorMessageComponent,
    NgOtpInputModule,
    NgOptimizedImage,
    RouterLink,
    CountdownModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyOtpFormComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  readonly phone = this.route.snapshot.queryParams['phone'];
  AppPaths = AppPaths;
  AuthPaths = AuthPaths;
  hide = signal(true);
  loading = signal(false);
  message = signal('');
  showPassword = signal(false);
  showCountDown = signal(false);

  private countdown = viewChild<CountdownComponent>('cd');

  config: CountdownConfig = {
    // demand: true,
    leftTime: 300,
    format: 'mm:ss',
  };

  subs = new SubscriptionHandler();

  ngOnDestroy(): void {
    this.subs.unSubscribe();
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  companyOtpForm = new FormGroup({
    otp: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ],
    }),
  });

  get otp() {
    return this.companyOtpForm.get('otp');
  }

  resendOtp() {
    this.subs.add = this.authService.sendOtp(this.phone as string).subscribe({
      next: (res) => {
        this.showCountDown.set(true);
        this.countdown()?.begin();
        this.loading.set(false);
        if (
          res.mfsCommonServiceResponse.mfsStatusInfo.status.includes('Failure')
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
      },
      error: (e) => {
        this.loading.set(false);
        this.message.set(e?.error?.message);
      },
    });
  }

  handleEvent(event: CountdownEvent) {
    console.log(event);
    if (event.left === 0) {
      this.showCountDown.set(false);
    }
  }

  onSubmit() {
    if (this.companyOtpForm.invalid) return;

    this.loading.set(true);
    this.subs.add = this.authService
      .verifyOtp(this.otp?.value as string)
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
          } else {
            this.router.navigate([AppPaths.account]);
          }
        },
        error: (e) => {
          this.loading.set(false);
          this.message.set(e?.error?.message);
        },
      });
  }
}
