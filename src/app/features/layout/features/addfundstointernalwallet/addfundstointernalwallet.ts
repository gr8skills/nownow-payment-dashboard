import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Beneficiary {
  transferName: string;
  expiryDate: string;
  transferFrequency: string;
  frequencyVariable: string;
  transferFrom: string;
  transferTo: string;
  description: string;
  minWalletBalance: string;
  status: string;
}

@Component({
  selector: 'app-addfundstointernalwallet',
  imports: [ReactiveFormsModule],
  templateUrl: './addfundstointernalwallet.html',
  styleUrl: './addfundstointernalwallet.scss'
})
export class Addfundstointernalwallet {
 beneficiaryForm: FormGroup;
  
  beneficiaries: Beneficiary[] = [
    {
      transferName: 'Monthly Savings',
      expiryDate: '2023-12-31',
      transferFrequency: 'Monthly',
      frequencyVariable: '1st of month',
      transferFrom: 'Main Wallet',
      transferTo: 'Savings Wallet',
      description: 'Automatic monthly savings transfer',
      minWalletBalance: '1000',
      status: 'Active'
    },
    {
      transferName: 'Weekly Investment',
      expiryDate: '2023-12-31',
      transferFrequency: 'Weekly',
      frequencyVariable: 'Every Monday',
      transferFrom: 'Main Wallet',
      transferTo: 'Investment Wallet',
      description: 'Weekly investment allocation',
      minWalletBalance: '500',
      status: 'Active'
    },
    {
      transferName: 'Daily Expenses',
      expiryDate: '2023-12-31',
      transferFrequency: 'Daily',
      frequencyVariable: '9:00 AM',
      transferFrom: 'Main Wallet',
      transferTo: 'Expense Wallet',
      description: 'Daily expense allocation',
      minWalletBalance: '200',
      status: 'Inactive'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.beneficiaryForm = this.fb.group({
      transferName: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      transferFrequency: ['', [Validators.required]],
      frequencyVariable: ['', [Validators.required]],
      transferFrom: ['', [Validators.required]],
      transferTo: ['', [Validators.required]],
      description: [''],
      minWalletBalance: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.beneficiaryForm.valid) {
      const formData = this.beneficiaryForm.value;
      
      const newBeneficiary: Beneficiary = {
        transferName: formData.transferName,
        expiryDate: formData.expiryDate,
        transferFrequency: formData.transferFrequency,
        frequencyVariable: formData.frequencyVariable,
        transferFrom: formData.transferFrom,
        transferTo: formData.transferTo,
        description: formData.description,
        minWalletBalance: formData.minWalletBalance,
        status: 'Active'
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
    Object.keys(this.beneficiaryForm.controls).forEach(key => {
      const control = this.beneficiaryForm.get(key);
      control?.markAsTouched();
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'inactive':
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
      if (field.errors['pattern']) return `Please enter a valid ${fieldName}`;
    }
    return '';
  }
}