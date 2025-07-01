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
import { Router, RouterLink } from "@angular/router"
import { AppPaths } from "@app/app.routes"
import { NgOptimizedImage } from "@angular/common"
import { AuthPaths } from "@auth/auth.route"
import { InputStyle } from '@shared/component/input/directive/input';


export interface LogingFormInterface {
  email: string
  password: string
}

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
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
export class ForgotPasswordFormComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  AppPaths = AppPaths;
  AuthPaths = AuthPaths;
  hide = signal(true);
  loading = signal(false);
  message = signal('');
  showPassword = signal(false);

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

  fgtForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  get email() {
    return this.fgtForm.get('email');
  }

  get password() {
    return this.fgtForm.get('password');
  }

  onSubmit() {}
}
