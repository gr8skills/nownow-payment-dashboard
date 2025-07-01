import { Component, inject, OnInit, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AppPaths } from "@app/app.routes";
import { ResetPasswordFormComponent } from "./ui/reset-password-form/reset-password-form.component";

@Component({
  selector: "app-reset-password",
  imports: [
    ResetPasswordFormComponent
  ],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent implements OnInit {
  private readonly title = inject(Title);
  readonly AppPaths = AppPaths;
  canLogin = signal(false);

  ngOnInit() {
    this.title.setTitle("Reset Password");
  }

  onSelected(status: boolean) {
    this.canLogin.set(status);
  }
}
