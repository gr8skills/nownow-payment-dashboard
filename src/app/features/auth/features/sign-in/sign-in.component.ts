import { Component, inject, OnInit, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AppPaths } from "@app/app.routes";
import { LoginFormComponent } from "./ui/login-form/login-form.component";

@Component({
  selector: "app-sign-in",
  imports: [
    LoginFormComponent,
  ],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
})
export class SignInComponent implements OnInit {
  private readonly title = inject(Title);
  readonly AppPaths = AppPaths;
  canLogin = signal(false);

  ngOnInit() {
    this.title.setTitle("Register Account");
  }

  onSelected(status: boolean) {
    this.canLogin.set(status);
  }
}
