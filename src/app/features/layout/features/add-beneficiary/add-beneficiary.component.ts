import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputStyle } from '@shared/component/input/directive/input';

interface Beneficiary {
  beneficiaryName: string;
  bankName: string;
  accountNumber: string;
  phoneNumber: string;
  status: string;
  emailId?: string;
  narration?: string;
}

@Component({
  selector: 'app-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrl: './add-beneficiary.component.scss',
  imports: [ReactiveFormsModule, InputStyle],
})
export class BeneficiaryComponent implements OnInit {
  beneficiaryForm: FormGroup;

  beneficiaries: Beneficiary[] = [
    {
      beneficiaryName: 'Pankaj Soni',
      bankName: 'Zenith Bank',
      accountNumber: '133997392048',
      phoneNumber: '8475869797',
      status: 'Success',
    },
    {
      beneficiaryName: 'Pankaj Soni',
      bankName: 'Zenith Bank',
      accountNumber: '133997392048',
      phoneNumber: '8475869797',
      status: 'Success',
    },
    {
      beneficiaryName: 'Pankaj Soni',
      bankName: 'Zenith Bank',
      accountNumber: '133997392048',
      phoneNumber: '8475869797',
      status: 'Success',
    },
    {
      beneficiaryName: 'Pankaj Soni',
      bankName: 'Zenith Bank',
      accountNumber: '133997392048',
      phoneNumber: '8475869797',
      status: 'Success',
    },
    {
      beneficiaryName: 'Pankaj Soni',
      bankName: 'Zenith Bank',
      accountNumber: '133997392048',
      phoneNumber: '8475869797',
      status: 'Success',
    },
    {
      beneficiaryName: 'Pankaj Soni',
      bankName: 'Zenith Bank',
      accountNumber: '133997392048',
      phoneNumber: '8475869797',
      status: 'Success',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.beneficiaryForm = this.fb.group(
      {
        beneficiaryName: ['', [Validators.required]],
        bankName: ['', [Validators.required]],
        accountNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        confirmAccountNumber: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{10,}$/)],
        ],
        narration: [''],
        emailId: ['', [Validators.email]],
      },
      {
        validators: this.accountNumberMatchValidator,
      }
    );
  }

  ngOnInit() {}

  accountNumberMatchValidator(form: FormGroup) {
    const accountNumber = form.get('accountNumber');
    const confirmAccountNumber = form.get('confirmAccountNumber');

    if (
      accountNumber &&
      confirmAccountNumber &&
      accountNumber.value !== confirmAccountNumber.value
    ) {
      confirmAccountNumber.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }

  onSubmit() {
    if (this.beneficiaryForm.valid) {
      const formData = this.beneficiaryForm.value;

      const newBeneficiary: Beneficiary = {
        beneficiaryName: formData.beneficiaryName,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        phoneNumber: formData.phoneNumber,
        status: 'Success',
        emailId: formData.emailId,
        narration: formData.narration,
      };

      this.beneficiaries.unshift(newBeneficiary);
      this.beneficiaryForm.reset();

      console.log('Beneficiary added:', newBeneficiary);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.beneficiaryForm.controls).forEach((key) => {
      const control = this.beneficiaryForm.get(key);
      control?.markAsTouched();
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'failed':
        return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.beneficiaryForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.beneficiaryForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['pattern']) return `Please enter a valid ${fieldName}`;
      if (field.errors['mismatch']) return 'Account numbers do not match';
    }
    return '';
  }
}