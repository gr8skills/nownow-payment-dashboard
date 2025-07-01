import { Component, signal } from "@angular/core"
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { ButtonComponent } from "@shared/component/button/button.component"
import { ErrorMessageComponent } from "@shared/component/error-message/error-message.component"

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorMessageComponent,
    ButtonComponent,
  ],
})
export class ContactUsComponent {
  message = signal("")
  loading = signal(false)

  contactForm = new FormGroup({
    name: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255),
      ],
    }),
  })

  get name() {
    return this.contactForm.get("name")
  }
  get email() {
    return this.contactForm.get("email")
  }
  get messageControl() {
    return this.contactForm.get("message")
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Form Submitted!", this.contactForm.value)
      // Here you can add the logic to send the form data to your server
      this.contactForm.reset() // Reset the form after submission
    } else {
      console.log("Form is invalid")
    }
  }
}
