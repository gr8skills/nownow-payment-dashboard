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
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    InputStyle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  AppPaths = AppPaths;
  AuthPaths = AuthPaths;
  hide = signal(true);
  loading = signal(false);
  message = signal('');
  showPassword = signal(false);
  showPassword2 = signal(false);

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

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  registerForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    }),
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup({
      password: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      confirm_password: new FormControl<string>('', {
        validators: [Validators.required],
      }),
    }),
    terms: new FormControl<boolean>(false),
  });

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {}
}
