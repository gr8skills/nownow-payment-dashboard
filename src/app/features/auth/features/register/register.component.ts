import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AppPaths } from "@app/app.routes";
import { RegisterFormComponent } from './ui/register-form/register-form.component';

@Component({
  selector: "app-register",
  imports: [RegisterFormComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  private readonly title = inject(Title)
  readonly AppPaths = AppPaths

  ngOnInit() {
    this.title.setTitle("Register Account")
  }
}
