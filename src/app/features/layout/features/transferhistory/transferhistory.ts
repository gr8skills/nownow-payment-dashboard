import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms'; // Added FormGroup import
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

// Define the Beneficiary interface
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
  selector: 'app-transferhistory',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule, MatIconModule ],
  templateUrl: './transferhistory.html',
  styleUrl: './transferhistory.scss',
  providers: [provideNativeDateAdapter()]
})
export class Transferhistory {
  
  beneficiaryForm: FormGroup;
  startDate = new Date('05/14/2025');
  endDate = new Date('05/20/2025');
  picker: any; // Placeholder for datepicker reference
  filterText: string = '';
  originaltransactions: any[] = []; // Original list of transactions
  filteredtransactions: any[] = []; // Filtered list of transactions
  // Date Range
  dateRange = {
    startDate: this.startDate,
    endDate: this.endDate
  };

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
      // your form controls here
    });
  }

  onDateRangeChange(event: any) {
    console.log('Date range changed:', event);
    // Implement date range filtering logic
  }
  
  onDateRangePickerInit(picker: any) {
    this.picker = picker;
    console.log('Date range picker initialized:', picker);
  }

  applyFilter() {
    if (!this.filterText) {
      this.filteredtransactions = [...this.originaltransactions];
      return;
    }
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
}