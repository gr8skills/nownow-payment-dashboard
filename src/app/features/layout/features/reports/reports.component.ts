import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface TransactionData {
  date: string;
  time: string;
  tranRN: string;
  acctName: string;
  acctNum: string;
  merchantOrderID: string;
  currency: string;
  transAmt: number;
  debCred: string;
  tranStatus: string;
  nowNowChrg: number;
  tranType: string;
  authCode: string;
  cardType: string;
  lst4Digit: string;
  cardIssBank: string;
  country: string;
  currencyType: string;
  convRate: number;
}

interface SettlementData {
  transactionDate: string;
  transactionTime: string;
  transactionRefNum: string;
  merchantOrderID: string;
  transactionAmount: number;
  charges: number;
  netAmountSettlement: number;
  settlementDate: string;
  settlementStatus: string;
  settlementBank: string;
  batchID: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule, MatIconModule ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
   providers: [provideNativeDateAdapter()]
})
export class ReportsComponent implements OnInit {
  activeTab: 'transaction' | 'settlement' = 'transaction';
  filterText: string = '';
  filteredtransactions: TransactionData[] = [];
  originaltransactions: TransactionData[] = [];

  startDate = new Date('05/14/2025');
  endDate = new Date('05/20/2025');
  picker: any; // Placeholder for datepicker reference
  // Date Range
  dateRange = {
    startDate: this.startDate,
    endDate: this.endDate
  };

  onDateRangeChange(event: any) {
    if (event.start && event.end) {
      this.startDate = event.start;
      this.endDate = event.end;
      this.dateRange = {
        startDate: event.start,
        endDate: event.end
      };
    }
  }

   // Settlement Data
  settlementData = [
    {
      transactionDate: '12-10-24',
      transactionTime: '10:15 AM',
      transactionRefNum: '3490459',
      merchantOrderID: 'ORD1001',
      transactionAmount: 1000,
      charges: 20,
      netAmountSettlement: 980,
      settlementDate: '12-11-24',
      settlementStatus: 'Successful',
      settlementBank: 'GTB',
      batchID: 'BTCH12345',
      paymentMethod: 'A-A'
    },
    {
      transactionDate: '11-11-24',
      transactionTime: '11:15 PM',
      transactionRefNum: '7640459',
      merchantOrderID: 'ORD6781',
      transactionAmount: 700,
      charges: 20,
      netAmountSettlement: 1180,
      settlementDate: '12-11-24',
      settlementStatus: 'failed',
      settlementBank: 'First Bank',
      batchID: 'BTCH78905',
      paymentMethod: 'A-A'
    },
    {
      transactionDate: '12-10-24',
      transactionTime: '10:15 AM',
      transactionRefNum: '3490459',
      merchantOrderID: 'ORD1001',
      transactionAmount: 1000,
      charges: 20,
      netAmountSettlement: 980,
      settlementDate: '12-11-24',
      settlementStatus: 'Successful',
      settlementBank: 'GTB',
      batchID: 'BTCH12345',
      paymentMethod: 'A-A'
    },
    {
      transactionDate: '12-10-24',
      transactionTime: '10:15 AM',
      transactionRefNum: '3490459',
      merchantOrderID: 'ORD1001',
      transactionAmount: 1000,
      charges: 20,
      netAmountSettlement: 980,
      settlementDate: '12-11-24',
      settlementStatus: 'Successful',
      settlementBank: 'union Bank',
      batchID: 'BTCH12345',
      paymentMethod: 'A-A'
    },
    {
      transactionDate: '02-06-25',
      transactionTime: '01:05 AM',
      transactionRefNum: '343459',
      merchantOrderID: 'ORD9801',
      transactionAmount: 5400,
      charges: 20,
      netAmountSettlement: 9300,
      settlementDate: '09-01-24',
      settlementStatus: 'pending',
      settlementBank: 'Sterling Bank',
      batchID: 'BTCH99345',
      paymentMethod: 'A-A'
    }
  ];

   // transactionData Data
   
  transactionData: TransactionData[] = [
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    },
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    },
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    },
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    },
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    },
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    },
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    },
    {
      date: '12-10-24',
      time: '10:15 AM',
      tranRN: '3490459',
      acctName: 'Wisdom',
      acctNum: '234589843',
      merchantOrderID: 'ORD1001',
      currency: 'NGN',
      transAmt: 1000,
      debCred: 'Debit',
      tranStatus: 'Successful',
      nowNowChrg: 20,
      tranType: 'Card',
      authCode: 'A182C3',
      cardType: 'Master Card',
      lst4Digit: '5436',
      cardIssBank: 'Interswitch',
      country: 'Spain',
      currencyType: 'Euros',
      convRate: 1600
    }
  ];

  ngOnInit() {}

  setActiveTab(tab: 'transaction' | 'settlement') {
    this.activeTab = tab;
  }

  onDownload() {
    if (this.activeTab === 'transaction') {
      console.log('Downloading Transaction Report');
      // Implement transaction report download
    } else {
      console.log('Downloading Settlement Report');
      // Implement settlement report download
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'successful':
        return 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'failed':
        return 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium';
    }
  }

  applyFilter() {
    if (!this.filterText) {
      this.filteredtransactions = [...this.originaltransactions];
      return;
    }

    const searchText = this.filterText.toLowerCase();
    this.filteredtransactions = this.originaltransactions.filter(detail =>
      detail.acctName.toLowerCase().includes(searchText) ||
      detail.acctNum.includes(searchText) ||
      detail.merchantOrderID.includes(searchText) ||
      detail.tranRN.toString().includes(searchText) ||
      detail.tranStatus.toLowerCase().includes(searchText) ||
      detail.cardType.toLowerCase().includes(searchText) ||
      detail.country.toLowerCase().includes(searchText) ||
      detail.currency.toLowerCase().includes(searchText) ||
      detail.authCode.toLowerCase().includes(searchText) ||
      detail.time.toLowerCase().includes(searchText) ||
      detail.lst4Digit.includes(searchText) ||
      (detail.cardIssBank && detail.cardIssBank.toLowerCase().includes(searchText))
    );
  }

}