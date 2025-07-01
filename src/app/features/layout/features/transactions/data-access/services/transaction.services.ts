import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { GenericResInterface } from '@app/shared/data-access/models/generic-response.models';

import * as TransactionTypes from '../transaction.types';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly http = inject(HttpClient);

  getTransactionReport() {
    const payload: TransactionTypes.GetTransactionReportInterface = {
      mfsCommonServiceRequest: {
        mfsAssistedTransaction: {},
        mfsSourceInfo: {
          channelId: '23',
          surroundSystem: '4',
        },
        mfsTransactionInfo: {
          requestId: '987688789816558972771625983882',
          serviceType: '0',
          timestamp: 1655897277247,
        },
      },
      mfsOptionalInfo: {},
      mfsRequestInfo: {
        entityId: '83000027011',
        count: '100',
        offSet: '0',
        walletType: '1',
      },
    };

    return this.http.post<
      GenericResInterface<TransactionTypes.GetTransactionReportResponseInterface>
    >(
      `${environment.apiUrl}/mfs-transaction-management/transactionManagement/report`,
      payload
    );
  }

  getTransactionPDF() {
    const payload: TransactionTypes.GetTransactionsInterface = {
      mfsCommonServiceRequest: {
        mfsAssistedTransaction: {},
        mfsSourceInfo: {
          channelId: '23',
          surroundSystem: '4',
        },
        mfsTransactionInfo: {
          requestId: '987688789816558972771625983882',
          serviceType: '0',
          timestamp: 1655897277247,
        },
      },
      mfsOptionalInfo: {},
      mfsRequestInfo: {
        entityId: '83000027011',
      },
    };

    return this.http.post<
      GenericResInterface<TransactionTypes.GetTransactionsResponseInterface>
    >(
      `${environment.apiUrl}/mfs-transaction-management/merchant/getReport?fileType=pdf`,
      payload
    );
  }

  getTransactionCSV() {
    const payload: TransactionTypes.GetTransactionsInterface = {
      mfsCommonServiceRequest: {
        mfsAssistedTransaction: {},
        mfsSourceInfo: {
          channelId: '23',
          surroundSystem: '4',
        },
        mfsTransactionInfo: {
          requestId: '987688789816558972771625983882',
          serviceType: '0',
          timestamp: 1655897277247,
        },
      },
      mfsOptionalInfo: {},
      mfsRequestInfo: {
        entityId: '83000027011',
      },
    };

    return this.http.post<
      GenericResInterface<TransactionTypes.GetTransactionsResponseInterface>
    >(
      `${environment.apiUrl}/mfs-transaction-management/merchant/getReport?fileType=csv`,
      payload
    );
  }

  downloadPDF() {
    const payload: TransactionTypes.DownloadPDFInterface = {
      entityId: '85000137977',
      fromDate: '22/05/2022',
      toDate: '22/06/2022',
    };

    return this.http.post<
      GenericResInterface<TransactionTypes.GetTransactionsResponseInterface>
    >(`${environment.apiUrl}/mfs-merchant-portal/merchant/getPDF`, payload);
  }

  downloadCSV() {
    const payload: TransactionTypes.DownloadPDFInterface = {
      entityId: '85000137977',
      fromDate: '22/05/2022',
      toDate: '22/06/2022',
    };

    return this.http.post<
      GenericResInterface<TransactionTypes.GetTransactionsResponseInterface>
    >(`${environment.apiUrl}/mfs-merchant-portal/merchant/getCSV`, payload);
  }

  getSettlementReport() {
    const params = new HttpParams({
      fromObject: {
        merchantId: '',
        from: '',
        to: '',
      },
    });

    return this.http.get<
      GenericResInterface<TransactionTypes.GetTransactionsResponseInterface>
    >(
      `${environment.apiUrl}/mfs-merchant-portal/settlement/get-settlement-report`,
      { params }
    );
  }

  getSettlementReportPDF() {
    return this.http.get<
      GenericResInterface<TransactionTypes.GetTransactionsResponseInterface>
    >(
      `${environment.apiUrl}/mfs-merchant-portal/settlement/settlement/settlement-report-download?fileType=pdf`
    );
  }

  getSettlementReportCSV() {
    return this.http.get<
      GenericResInterface<TransactionTypes.GetTransactionsResponseInterface>
    >(
      `${environment.apiUrl}/mfs-merchant-portal/settlement/settlement/settlement-report-download?fileType=csv`
    );
  }

  getRecentSettlement() {
    const params = new HttpParams({
      fromObject: {
        parentEntityId: '',
        outletId: '',
        limit: '',
        offset: '',
      },
    });

    return this.http.get<
      GenericResInterface<TransactionTypes.ResentSettlementInterface>
    >(
      `${environment.apiUrl}/mfs-merchant-portal/settlement/recent-settlements`,
      { params }
    );
  }

  getSettlement() {
    const params = new HttpParams({
      fromObject: {
        entityId: '85000061319',
      },
    });
    return this.http.get<
      GenericResInterface<TransactionTypes.ResentSettlementInterface>
    >(`${environment.apiUrl}/mfs-merchant-portal/settlement`, { params });
  }

  getBalanceInquiry() {
    const payload: TransactionTypes.GetBalanceInquiryInterface = {
      mfsCommonServiceRequest: {
        mfsAssistedTransaction: {},
        mfsSourceInfo: {
          channelId: '23',
          surroundSystem: '4',
        },
        mfsTransactionInfo: {
          requestId: '987688789816558972771625983882',
          serviceType: '0',
          timestamp: 1655897277247,
        },
      },
      mfsOptionalInfo: {},
      mfsRequestInfo: {
        benificiaryAccount: '1414141414',
        bin: '120001',
      },
    };

    return this.http.post<
      GenericResInterface<TransactionTypes.GetBalanceInquiryResponseInterface>
    >(
      `${environment.apiUrl}mfs-transaction-management/balanceManagement/bank/balanceInquiry`,
      payload
    );
  }

  getBalanceManagementEnquiry() {
    return this.http.get<
      GenericResInterface<TransactionTypes.GetBalanceManagementEnquiryResponseInterface>
    >(
      `${environment.apiUrl}/mfs-transaction-management/balanceManagement/enquiry`
    );
  }
}
