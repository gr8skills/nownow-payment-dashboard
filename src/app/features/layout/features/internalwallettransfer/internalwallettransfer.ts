import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-internalwallettransfer',
  imports: [ReactiveFormsModule],
  templateUrl: './internalwallettransfer.html',
  styleUrl: './internalwallettransfer.scss'
})
export class Internalwallettransfer {
 beneficiaryForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.beneficiaryForm = this.fb.group({
      transferName: ['', [Validators.required]],
      description: [''],
      transferFrom: ['', [Validators.required]],
      transferTo: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.beneficiaryForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.beneficiaryForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['pattern']) return `Please enter a valid ${fieldName}`;
    }
    return '';
  }

  onSubmit() {
    if (this.beneficiaryForm.valid) {
      console.log('Form submitted:', this.beneficiaryForm.value);
      // Add your form submission logic here
    }
  }
}
