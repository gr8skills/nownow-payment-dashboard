import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppPaths } from '@app/app.routes';
import { AccountPaths } from '@layout/layout.routes';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: SubMenuItem[];
  expanded?: boolean;
}

interface SubMenuItem {
  id: string;
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: `
  .sidebar-container {
        /* Custom scrollbar if needed */
        scrollbar-width: thin;
        scrollbar-color: #cbd5e0 #f7fafc;
            }

        .sidebar-container::-webkit-scrollbar {
        width: 6px;
        }

        .sidebar-container::-webkit-scrollbar-track {
        background: #f7fafc;
        }

        .sidebar-container::-webkit-scrollbar-thumb {
        background: #cbd5e0;
        border-radius: 3px;
        }

        .sidebar-container::-webkit-scrollbar-thumb:hover {
        background: #a0aec0;
        }
  `,

  imports: [NgOptimizedImage],
})
export class SidebarComponent {
  private readonly router = inject(Router);
  user = {
    name: 'Olaniyan Wisdom',
    role: 'Super Admin',
    avatar: '/media/profile.jpg', // You'll need to add the actual image
  };

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'grid',
      route: AccountPaths.dashboard,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'document',
      route: AccountPaths.reports,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: 'currency-dollar',
      route: AccountPaths.transactions,
    },
    {
      id: 'payment-outward',
      label: 'Payment Outward',
      icon: 'credit-card',
      expanded: false,
      children: [
        {
          id: 'add-beneficiary',
          label: 'Add / View Beneficiary Acct',
          route: AccountPaths.addBeneficiary,
          active: true,
        },
        {
          id: 'single-payment',
          label: 'Single Payment',
          route: AccountPaths.singlePayment,
        },
        {
          id: 'bulk-payment',
          label: 'Bulk Payment',
          route: AccountPaths.bulkPayment,
        },
      ],
    },
    {
      id: 'add-transfer',
      label: 'Add / Transfer Fund',
      icon: 'switch-horizontal',
      route: AccountPaths.transactions,
      expanded: false,
      children: [
        {
          id: 'fund-internal-wallet',
          label: 'Add funds to internal wallet',
          route: AccountPaths.Addfundstointernalwallet,
        },
        {
          id: 'schedule-internal-wallet',
          label: 'Schedule Internal wallet transfer',
          route: AccountPaths.singlePayment,
        },
        {
          id: 'internal-wallet-transfer',
          label: 'Instant Internal Wallet transfer',
          route: AccountPaths.internalwallettransfer,
        },
        {
          id: 'transfer-history',
          label: 'Transfer history',
          route: AccountPaths.transferhistory,
        },
      ],
    },
    {
      id: 'payment-link',
      label: 'Payment Link',
      icon: 'link',
      route: AccountPaths.paymentlink,
    },
    {
      id: 'agent-management',
      label: 'Agent Management',
      icon: 'user',
      route: AccountPaths.agentManagement,
    },
    {
      id: 'pos-management',
      label: 'POS Management',
      icon: 'calculator',
      route: AccountPaths.posManagement,
    },
  ];

  toggleMenuItem(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  navigateToRoute(route: string) {
    this.router.navigate(['/', AppPaths.account, route]);
  }

  onSubMenuClick(subItem: SubMenuItem) {
    // Reset all active states
    this.menuItems.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => (child.active = false));
      }
    });

    // Set the clicked item as active
    subItem.active = true;
    this.navigateToRoute(subItem.route);
  }
}
