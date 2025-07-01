import { Component, inject, OnInit, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AppPaths } from "@app/app.routes";
import { ForgotPasswordFormComponent } from "./ui/forgot-password-form/forgot-password-form.component";

@Component({
  selector: "app-forgot-password",
  imports: [
    ForgotPasswordFormComponent
  ],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent implements OnInit {
  private readonly title = inject(Title);
  readonly AppPaths = AppPaths;
  canLogin = signal(false);

  ngOnInit() {
    this.title.setTitle("Forgot Password");
  }

  onSelected(status: boolean) {
    this.canLogin.set(status);
  }
}
