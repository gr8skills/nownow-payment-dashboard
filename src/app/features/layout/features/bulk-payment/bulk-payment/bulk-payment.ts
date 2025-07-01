import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  
import { CommonModule } from '@angular/common';

interface BulkPaymentFile {
  serialNo: number;
  fileName: string;
  dateOfTransfer: string;
  status: 'Success' | 'Failed';
  transactionAmount: number;
}


@Component({
  selector: 'app-bulk-payment',
   standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bulk-payment.html',
  styleUrl: './bulk-payment.scss'
})
export class BulkPayment {

  // If you need to navigate programmatically, you can use:
  constructor(private router: Router) {}

  // Example method for programmatic navigation
  viewFileDetails(fileId: number, file: BulkPaymentFile) {
    this.router.navigate(['/account/bulk-payment-file', fileId], 
      { queryParams: { fileName: file.fileName } }
    );
  }


 @ViewChild('fileInput') fileInput!: ElementRef;
  
  isDragging = false;
  uploadedFiles: File[] = [];
  
  bulkPaymentFiles: BulkPaymentFile[] = [
    {
      serialNo: 1,
      fileName: 'payment_batch_1.xlsx',
      dateOfTransfer: '2023-05-15',
      status: 'Success',
      transactionAmount: 12500
    },
    {
      serialNo: 2,
      fileName: 'payment_batch_2.xlsx',
      dateOfTransfer: '2023-05-16',
      status: 'Failed',
      transactionAmount: 8700
    },
    {
      serialNo: 3,
      fileName: 'payment_batch_3.xlsx',
      dateOfTransfer: '2023-05-17',
      status: 'Success',
      transactionAmount: 15600
    },
    {
      serialNo: 4,
      fileName: 'payment_batch_4.xlsx',
      dateOfTransfer: '2023-05-18',
      status: 'Success',
      transactionAmount: 9200
    },
    {
      serialNo: 5,
      fileName: 'payment_batch_5.xlsx',
      dateOfTransfer: '2023-05-19',
      status: 'Failed',
      transactionAmount: 11300
    },
    {
      serialNo: 6,
      fileName: 'payment_batch_6.xlsx',
      dateOfTransfer: '2023-05-20',
      status: 'Success',
      transactionAmount: 7800
    },
    {
      serialNo: 7,
      fileName: 'payment_batch_7.xlsx',
      dateOfTransfer: '2023-05-21',
      status: 'Success',
      transactionAmount: 14500
    },
    {
      serialNo: 8,
      fileName: 'payment_batch_8.xlsx',
      dateOfTransfer: '2023-05-22',
      status: 'Success',
      transactionAmount: 10200
    }
  ];

  // Prevent default drag behaviors
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  // Handle dropped files
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  // Handle file selection via input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  // Process the uploaded files
  private handleFiles(files: FileList) {
    this.uploadedFiles = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (this.isValidFileType(file)) {
        this.uploadedFiles.push(file);
        console.log('File uploaded:', file.name);
      } else {
        console.warn('Invalid file type:', file.name);
      }
    }
    
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  // Check if file is Excel or CSV
  private isValidFileType(file: File): boolean {
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return validExtensions.includes(`.${fileExtension}`);
  }

  // Trigger file input click
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Submit files for processing
  submitFiles() {
    console.log('Submitting files:', this.uploadedFiles);
    // Implement your file processing logic here
    
    // Example: Add new file to the table
    if (this.uploadedFiles.length > 0) {
      const newFile: BulkPaymentFile = {
        serialNo: this.bulkPaymentFiles.length + 1,
        fileName: this.uploadedFiles[0].name,
        dateOfTransfer: new Date().toISOString().split('T')[0],
        status: Math.random() > 0.3 ? 'Success' : 'Failed',
        transactionAmount: Math.floor(Math.random() * 20000) + 5000
      };
      
      this.bulkPaymentFiles = [newFile, ...this.bulkPaymentFiles];
      this.uploadedFiles = [];
    }
  }

  onDownload() {
    console.log('Download sample files');
    // Implement download functionality for sample files
  }

  onDownloadBankCodes() {
    console.log('Download bank codes');
    // Implement download functionality for bank codes
  }
}
