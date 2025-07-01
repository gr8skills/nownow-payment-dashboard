import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface PaymentDetail {
  serialNo: number;
  beneficiaryName: string;
  beneficiaryAccount: string;
  mobileNo: string;
  amount: number;
  status: 'Success' | 'Failed';
  reason: string;
  selected?: boolean; 
}

@Component({
  selector: 'app-bulk-payment-file',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-payment-file.html',
  styleUrls: ['./bulk-payment-file.scss']
})
export class BulkPaymentFile {
  fileId: string | null = null;
  fileName: string = '';
  filterText: string = '';
  originalPaymentDetails: PaymentDetail[] = [];
  filteredPaymentDetails: PaymentDetail[] = [];
  showReceiptModal: boolean = false;
  selectedReceipt: any = null;
  showEmailModal: boolean = false;
  emailAddress: string = '';

  // Mock receipt data
  receiptData = {
    orderNumber: '123456789',
    agencyName: 'Lexxines Agency',
    agencyAddress: '123 Business Street',
    agencyCityStateZip: 'Lagos, Nigeria 100001',
    citation: '98765',
    subTotal: 10.00,
    serviceFee: 10.00,
    total: 20.00
  };

  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    this.route.params.subscribe(params => {
      this.fileId = params['id'];
      this.fileName = params['fileName'] || 'Payment_File_' + this.fileId;
      console.log('Viewing file:', this.fileName, 'with ID:', this.fileId);
      this.initializeData();
    });
  }

  initializeData() {
    // This would come from API in real app
    this.originalPaymentDetails = [
      {
        serialNo: 1,
        beneficiaryName: 'John Doe',
        beneficiaryAccount: '1234567890',
        mobileNo: '08012345678',
        amount: 5000,
        status: 'Success',
        reason: ''
      },
      {
        serialNo: 2,
        beneficiaryName: 'Jane Smith',
        beneficiaryAccount: '0987654321',
        mobileNo: '08098765432',
        amount: 7500,
        status: 'Failed',
        reason: 'Wrong Bank Code'
      },
      {
        serialNo: 3,
        beneficiaryName: 'Robert Johnson',
        beneficiaryAccount: '1122334455',
        mobileNo: '08011223344',
        amount: 10000,
        status: 'Success',
        reason: ''
      },
      {
        serialNo: 4,
        beneficiaryName: 'Emily Davis',
        beneficiaryAccount: '5566778899',
        mobileNo: '08055667788',
        amount: 3000,
        status: 'Failed',
        reason: 'Insufficient Funds'
      }
    ];
    this.filteredPaymentDetails = [...this.originalPaymentDetails];
  }

  applyFilter() {
    if (!this.filterText) {
      this.filteredPaymentDetails = [...this.originalPaymentDetails];
      return;
    }

    const searchText = this.filterText.toLowerCase();
    this.filteredPaymentDetails = this.originalPaymentDetails.filter(detail =>
      detail.beneficiaryName.toLowerCase().includes(searchText) ||
      detail.beneficiaryAccount.includes(searchText) ||
      detail.mobileNo.includes(searchText) ||
      detail.amount.toString().includes(searchText) ||
      detail.status.toLowerCase().includes(searchText) ||
      (detail.reason && detail.reason.toLowerCase().includes(searchText))
    );
  }


  openReceiptModal(detail: PaymentDetail) {
    console.log('Attempting to open modal for:', detail); 
    if (detail.status === 'Success') {
      this.selectedReceipt = detail;
      this.showReceiptModal = true;
      console.log('Modal should be visible now');
    }
  }

  closeReceiptModal() {
    this.showReceiptModal = false;
    this.selectedReceipt = null;
  }



  toggleAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.filteredPaymentDetails.forEach(detail => detail.selected = isChecked);
  }
  downloadReceipt() {
    // Implement download functionality
    console.log('Download receipt for:', this.selectedReceipt);
  }
  
  openEmailModal(): void {
    this.showEmailModal = true;
  }

  closeEmailModal(): void {
    this.showEmailModal = false;
    this.emailAddress = ''; // reset input
  }

  sendEmail(): void {
    if (this.emailAddress) {
      // Add your logic here, e.g., send email via API
      console.log('Sending email to:', this.emailAddress);
      this.closeEmailModal();
    }
  }
}