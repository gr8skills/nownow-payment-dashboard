import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/data-access/guards/auth.guard";

export const AccountPaths = {
  dashboard: 'dashboard',
  reports: 'reports',
  transactions: 'transactions',
  paymentlink: 'payment-link',
  agentManagement: 'agent-management',
  posManagement: 'pos-management',
  addBeneficiary: 'add-beneficiary',
  singlePayment: 'single-payment',
  bulkPayment: 'bulk-payment',
  bulkPaymentFile: 'bulk-payment-file/:id',
  Addfundstointernalwallet: 'add-funds-to-internal-wallet',
  scheduleinternalwallettransfer: 'schedule-internal-wallet-transfer',
  internalwallettransfer: 'internal-wallet-transfer',
  transferhistory: 'transfer-history',


};

export default [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((c) => c.LayoutComponent),
    // canActivate: [AuthGuard],
    children: [
      {
        path: AccountPaths.dashboard,
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
        data: { title: 'dashboard' },
      },
      {
        path: AccountPaths.reports,
        loadComponent: () =>
          import('./features/reports/reports.component').then(
            (c) => c.ReportsComponent
          ),
        data: { title: 'reports' },
      },
      {
        path: AccountPaths.transactions,
        loadComponent: () =>
          import('./features/transactions/transactions.component').then(
            (c) => c.TransactionsComponent
          ),
        data: { title: 'transactions' },
      },
      {
        path: AccountPaths.addBeneficiary,
        loadComponent: () =>
          import('./features/add-beneficiary/add-beneficiary.component').then(
            (c) => c.BeneficiaryComponent
          ),
        data: { title: 'add beneficiaries' },
      },
      {
        path: AccountPaths.singlePayment,
        loadComponent: () =>
          import('./features/transactions/transactions.component').then(
            (c) => c.TransactionsComponent
          ),
        data: { title: 'transactions' },
      },
      {
        path: AccountPaths.bulkPayment,
        loadComponent: () =>
          import('./features/bulk-payment/bulk-payment/bulk-payment').then(
            (c) => c.BulkPayment 
          ),
        data: { title: 'bulk-payment' },
      },
      {
      path: AccountPaths.bulkPaymentFile,
      loadComponent: () =>
        import('./features/bulk-payment/bulk-payment-file/bulk-payment-file/bulk-payment-file').then(
          (c) => c.BulkPaymentFile
        ),
      data: { title: 'bulk-payment-file' },
      },
      {
        path: AccountPaths.paymentlink,
        loadComponent: () =>
          import('./features/payment-link/payment-link.component').then(
            (c) => c.PaymentLinkComponent
          ),
        data: { title: 'payment link' },
      },
      {
        path: AccountPaths.agentManagement,
        loadComponent: () =>
          import('./features/agent-management/agent-management.component').then(
            (c) => c.AgentManagementComponent
          ),
        data: { title: 'agent management' },
      },
      {
        path: AccountPaths.posManagement,
        loadComponent: () =>
          import('./features/pos-management/pos-management.component').then(
            (c) => c.PosManagementComponent
          ),
        data: { title: 'pos management' },
      },
      {
        path: AccountPaths.Addfundstointernalwallet,
        loadComponent: () =>
          import('./features/addfundstointernalwallet/addfundstointernalwallet').then(
            (c) => c.Addfundstointernalwallet
          ),
        data: { title: 'Add funds to internal wallet' },
      },
      {
        path: AccountPaths.internalwallettransfer,
        loadComponent: () =>
          import('./features/internalwallettransfer/internalwallettransfer').then(
            (c) => c.Internalwallettransfer
          ),
        data: { title: 'Instant Internal wallet transfer' },
      },
      {
        path: AccountPaths.transferhistory,
        loadComponent: () =>
          import('./features/transferhistory/transferhistory').then(
            (c) => c.Transferhistory
          ),
        data: { title: 'Instant Internal wallet transfer' },
      },
      {
        path: '',
        redirectTo: `${AccountPaths.dashboard}`,
        pathMatch: 'full',
      },
    ],
  },
] as Routes;