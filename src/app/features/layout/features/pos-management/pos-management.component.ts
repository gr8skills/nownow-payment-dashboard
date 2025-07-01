import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

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
  selector: 'app-pos-management',
  imports: [CommonModule],
  templateUrl: './pos-management.component.html',
  styleUrl: './pos-management.component.scss'
})
export class PosManagementComponent implements OnInit {
  
  metricCards: MetricCard[] = [
    {
      title: 'Active POS',
      value: '92',
      subtitle: 'Transacted in last 24 hours',
      type: 'agent'
    },
    {
      title: 'In-Active POS',
      value: '08',
      subtitle: 'Transacted in last 24 hours',
      type: 'agent'
    },
    {
      title: 'De-Active POS',
      value: '10',
      subtitle: 'Transacted in last 24 hours',
      type: 'agent'
    },
    {
      title: 'Retrived POS',
      value: '10',
      subtitle: 'POS retrived from the Agent',
      type: 'agent'
    },
        {
      title: 'Non-Functional POS',
      value: '08',
      subtitle: 'Ticket raised for non-functional POS machine',
      type: 'agent'
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


  showRemappingModal: boolean = false;
  showPosModal: boolean = false;
  ngOnInit() {}

  openRemapModal(): void {
    this.showRemappingModal = true;
  }

  openPosModal(): void {
    this.showPosModal = true;
  }

  closeRemapModal(): void {
    this.showRemappingModal = false;
  }

  closePosModal(): void {
    this.showPosModal = false;
  }

  sendReMapPos(): void {
     console.log('Sending Remap Pos to:');
      this.closeRemapModal();
  }

  sendPos(): void {
     console.log('Sending Pos to:');
      this.closePosModal();
  }

  onAddAgent() {
    console.log('Add Agent clicked');
    // Implement add agent functionality
  }

  toggleAgentActivation(agent: AgentData) {
    agent.agentActivation = !agent.agentActivation;
    console.log('Agent activation toggled:', agent);
    // Implement activation toggle logic
  }

  editAgent(agent: AgentData) {
    console.log('Edit agent:', agent);
    // openemail modal
    this.showRemappingModal = true;
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

  formatStatus(status: string): string {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('mapped')) return 'Mapped';
  if (statusLower.includes('created') || statusLower.includes('activated')) return 'Unmapped';
  return status;
  }
  // Determine ticket status
  getTicketStatus(agent: AgentData): string {
    // Sample logic, can be replaced with real data
    if (!agent.posSerialNo || agent.posSerialNo === 'N/A') return 'No attached';
    if (agent.status.toLowerCase().includes('closed')) return 'Closed';
    return 'N/A';
  }

  // Handle raise ticket action
  raiseTicket(agent: AgentData) {
    console.log('Raise ticket for agent:', agent);
    this.showPosModal = true;
    // Implement ticket raising functionality
  }

}