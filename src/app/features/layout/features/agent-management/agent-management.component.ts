import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AgentData {
  serialNo: number;
  agentName: string;
  contactNo: string;
  emailAddress: string;
  subWalletId: string;
  posSerialNo: string;
  balance: number;
  agentActivation: boolean;
  status: string;
}

interface MetricCard {
  title: string;
  value: string;
  subtitle: string;
  type: 'agent' | 'transaction';
}

@Component({
  selector: 'app-agent-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-management.component.html',
  styleUrl: './agent-management.component.scss'
})
export class AgentManagementComponent implements OnInit {
  isModalOpen = false;
  isPinModalOpen = false;

  pin1: string = '';
  pin2: string = '';
  pin3: string = '';
  pin4: string = '';

  @ViewChild('pin1Input') pin1Input!: ElementRef;
  @ViewChild('pin2Input') pin2Input!: ElementRef;
  @ViewChild('pin3Input') pin3Input!: ElementRef;
  @ViewChild('pin4Input') pin4Input!: ElementRef;

  newAgent = {
  name: '',
  contactNo: '',
  email: '',
  address: '',
  requestPos: ''
  };

  onPinModalOpen() {
    this.isPinModalOpen = true;
  }

  onPinModalClose() {
    this.isPinModalOpen = false;
    this.resetPinFields();
  }

  submitPin() {
    const fullPin = this.pin1 + this.pin2 + this.pin3 + this.pin4;
    console.log('Submitted PIN:', fullPin);
    // Handle actual PIN validation here
    this.isPinModalOpen = false;
    this.resetPinFields();
  }

   resetPinFields() {
    this.pin1 = '';
    this.pin2 = '';
    this.pin3 = '';
    this.pin4 = '';
  }

  onAddAgent() {
  this.isModalOpen = true;
  }

  submitAgent() {
    console.log('Submit new agent');
    this.onPinModalOpen();
  }


  closeModal() {
    this.isModalOpen = false;
  }

  onPinInput(event: any, nextInput?: HTMLInputElement) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      input.value = ''; 
      return;
    }

    // Move focus
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  onPinKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onNumberInput(input: any) {
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  metricCards: MetricCard[] = [
    {
      title: 'Active Agent',
      value: '92',
      subtitle: 'Transacted in last 24 hours',
      type: 'agent'
    },
    {
      title: 'In-Active Agent',
      value: '08',
      subtitle: 'Transacted in last 24 hours',
      type: 'agent'
    },
    {
      title: 'De-Active Agent',
      value: '10',
      subtitle: 'Transacted in last 24 hours',
      type: 'agent'
    },
    {
      title: 'Inward Transaction (Today)',
      value: '₦2,345,800.00',
      subtitle: 'No of Transaction  2345',
      type: 'transaction'
    },
    {
      title: 'Outward Transaction ( Today )',
      value: '₦2,345,800.00',
      subtitle: 'No of Transaction  2345',
      type: 'transaction'
    }
  ];

  agentData: AgentData[] = [
    {
      serialNo: 1,
      agentName: 'Pankaj Soni',
      contactNo: '9876543210',
      emailAddress: 'psoni@nownow.ng',
      subWalletId: '123456789',
      posSerialNo: '12234564',
      balance: 100000.00,
      agentActivation: true,
      status: 'Agent Created'
    },
    {
      serialNo: 1,
      agentName: 'Pankaj Soni',
      contactNo: '9876543210',
      emailAddress: 'psoni@nownow.ng',
      subWalletId: '123456789',
      posSerialNo: 'N/A',
      balance: 0,
      agentActivation: false,
      status: 'Wallet Created'
    },
    {
      serialNo: 1,
      agentName: 'Pankaj Soni',
      contactNo: '9876543210',
      emailAddress: 'psoni@nownow.ng',
      subWalletId: '123456789',
      posSerialNo: '12234564',
      balance: 100000.00,
      agentActivation: true,
      status: 'POS Mapped'
    },
    {
      serialNo: 1,
      agentName: 'Pankaj Soni',
      contactNo: '9876543210',
      emailAddress: 'psoni@nownow.ng',
      subWalletId: '123456789',
      posSerialNo: '12234564',
      balance: 100000.00,
      agentActivation: true,
      status: 'Wallet activated'
    },
    {
      serialNo: 1,
      agentName: 'Pankaj Soni',
      contactNo: '9876543210',
      emailAddress: 'psoni@nownow.ng',
      subWalletId: '123456789',
      posSerialNo: '12234564',
      balance: 100000.00,
      agentActivation: false,
      status: 'Wallet de-activated'
    },
    {
      serialNo: 1,
      agentName: 'Pankaj Soni',
      contactNo: '9876543210',
      emailAddress: 'psoni@nownow.ng',
      subWalletId: '123456789',
      posSerialNo: '12234564',
      balance: 100000.00,
      agentActivation: true,
      status: 'Wallet Closed'
    }
  ];

  ngOnInit() {}

  toggleAgentActivation(agent: AgentData) {
    agent.agentActivation = !agent.agentActivation;
    console.log('Agent activation toggled:', agent);
    // Implement activation toggle logic
  }

  editAgent(agent: AgentData) {
    console.log('Edit agent:', agent);
    // Implement edit functionality
  }

  deleteAgent(agent: AgentData) {
    console.log('Delete agent:', agent);
    // Implement delete functionality
  }

  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('created') || statusLower.includes('activated') || statusLower.includes('mapped')) {
      return 'text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium';
    } else if (statusLower.includes('de-activated') || statusLower.includes('closed')) {
      return 'text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-medium';
    } else {
      return 'text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium';
    }
  }

  formatBalance(balance: number): string {
    return balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
  }
}