import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Transaction {
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
  selector: 'app-payment-link',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule, MatIconModule ],
  templateUrl: './payment-link.component.html',
  styleUrl: './payment-link.component.scss',
    providers: [provideNativeDateAdapter()]
})
export class PaymentLinkComponent  {
filterText: string = '';

  // Sample data for transactions
  transactions: Transaction[] = [
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

  applyFilter() {
if (this.filterText) {
      this.transactions = this.transactions.filter(transaction =>
        Object.values(transaction).some(value =>
          value.toString().toLowerCase().includes(this.filterText.toLowerCase())
        )
      );
    }
  }
}

