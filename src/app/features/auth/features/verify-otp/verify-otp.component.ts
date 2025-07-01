import { Component, inject, OnInit, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AppPaths } from "@app/app.routes";
import { VerifyOtpFormComponent } from "./ui/verify-otp-form/verify-otp-form.component";

@Component({
  selector: "app-verify-otp",
  imports: [
    VerifyOtpFormComponent
  ],
  templateUrl: "./verify-otp.component.html",
  styleUrl: "./verify-otp.component.scss",
})
export class VerifyOtpComponent implements OnInit {
  private readonly title = inject(Title);
  readonly AppPaths = AppPaths;

  ngOnInit() {
    this.title.setTitle("Verify OTP");
  }

}
