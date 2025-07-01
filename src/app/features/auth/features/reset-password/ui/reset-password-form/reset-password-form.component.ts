import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@shared/component/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionHandler } from '@app/shared/utils/subscription-handler';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AppPaths } from '@app/app.routes';
import { NgOptimizedImage } from '@angular/common';
import { AuthPaths } from '@auth/auth.route';
import { InputStyle } from '@shared/component/input/directive/input';
export interface LogingFormInterface {
  email: string;
  password: string;
}

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  AppPaths = AppPaths;
  AuthPaths = AuthPaths;
  hide = signal(true);
  loading = signal(false);
  message = signal('');
  showPassword = signal(false);
  showPassword2 = signal(false);
  showPassword3 = signal(false);

  subs = new SubscriptionHandler();

  ngOnDestroy(): void {
    this.subs.unSubscribe();
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
  togglePasswordVisibility2() {
    this.showPassword2.set(!this.showPassword2());
  }
  togglePasswordVisibility3() {
    this.showPassword3.set(!this.showPassword3());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  resetForm = new FormGroup({
    passwords: new FormGroup({
      password: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      confirm_password: new FormControl<string>('', {
        validators: [Validators.required],
      }),
    }),
    new_password: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  get email() {
    return this.resetForm.get('email');
  }

  get password() {
    return this.resetForm.get('password');
  }

  onSubmit() {}
}
