import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
  signal,
  OnDestroy,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransactionService } from '../transactions/data-access/services/transaction.services';
import { SubscriptionHandler } from '@shared/utils/subscription-handler';
import { GetTransactionReportResponseInterface } from '../transactions/data-access/transaction.types';

Chart.register(...registerables);

interface MetricCard {
  title: string;
  amount: string;
  subtitle: string;
  showEye: boolean;
  visible: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChart') donutChartRef!: ElementRef<HTMLCanvasElement>;

  private readonly transactionService = inject(TransactionService);

  readonly transactions = signal<GetTransactionReportResponseInterface | null>(
    null
  );

  readonly subs = new SubscriptionHandler();

  userName = 'Wisdom';

  metricCards: MetricCard[] = [
    {
      title: 'Current Balance',
      amount: '₦2,345,800.00',
      subtitle: 'Wallet ID : 34567203',
      showEye: true,
      visible: true,
    },
    {
      title: 'Inward Transaction (Today)',
      amount: '₦2,345,800.00',
      subtitle: 'No of Transaction  2345',
      showEye: true,
      visible: true,
    },
    {
      title: 'Outward Transaction (Today)',
      amount: '₦2,345,800.00',
      subtitle: 'No of Transaction  2345',
      showEye: true,
      visible: true,
    },
  ];

  lineChart!: Chart;
  donutChart!: Chart;

  transactionStatusData = [
    { label: 'Total Transaction (100%)', value: 1000, color: '#E5E7EB' },
    { label: 'Success Transaction (91%)', value: 9100, color: '#10B981' },
    { label: 'Failed Transaction (8.8%)', value: 880, color: '#EF4444' },
    { label: 'Pending Transaction', value: 20, color: '#3B82F6' },
  ];

  ngOnInit() {
    this.getTransactionReport();
  }

  ngAfterViewInit() {
    this.initializeCharts();
  }

  ngOnDestroy(): void {
    this.subs.unSubscribe();
  }

  getTransactionReport() {
    this.subs.add = this.transactionService.getTransactionReport().subscribe({
      next: (res) => {
        this.transactions.set(res.mfsResponseInfo);
      },
      error: (err) => {},
    });
  }

  toggleVisibility(card: MetricCard) {
    card.visible = !card.visible;
  }

  onFilterClick() {
    console.log('Filter clicked');
    // Implement filter functionality
  }

  private initializeCharts() {
    this.createLineChart();
    this.createDonutChart();
  }

  private createLineChart() {
    const ctx = this.lineChartRef.nativeElement.getContext('2d');

    if (ctx) {
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'Today',
            'Last Day',
            'Last Week',
            'Last Month',
            'Last 6 Month',
            'Year till date',
            'Last Year',
          ],
          datasets: [
            {
              label: 'Inward Transaction',
              data: [50, 75, 100, 150, 200, 180, 160],
              borderColor: '#6366F1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
            },
            {
              label: 'Outward Transaction',
              data: [30, 45, 80, 120, 170, 150, 140],
              borderColor: '#EC4899',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'start',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: {
                  size: 12,
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  if (value === 0) return '1 Million';
                  if (value === 50) return '10 Million';
                  if (value === 100) return '100 Million';
                  if (value === 200) return '1 Billion';
                  return value;
                },
                font: {
                  size: 11,
                },
                color: '#6B7280',
              },
              grid: {
                color: '#F3F4F6',
              },
            },
            x: {
              ticks: {
                font: {
                  size: 11,
                },
                color: '#6B7280',
              },
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }

  private createDonutChart() {
    const ctx = this.donutChartRef.nativeElement.getContext('2d');

    if (ctx) {
      this.donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.transactionStatusData.map((item) => item.label),
          datasets: [
            {
              data: [91, 8.8, 0.2], // Percentages for Success, Failed, Pending
              backgroundColor: ['#10B981', '#EF4444', '#3B82F6'],
              borderWidth: 0,
              // cutout: '70%',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.label + ': ' + context.parsed + '%';
                },
              },
            },
          },
        },
      });
    }
  }
}
