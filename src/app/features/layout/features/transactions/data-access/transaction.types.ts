export interface GetTransactionsInterface {
  mfsCommonServiceRequest: {
    mfsAssistedTransaction: {};
    mfsSourceInfo: { channelId: string; surroundSystem: string };
    mfsTransactionInfo: {
      requestId: string;
      serviceType: string;
      timestamp: number;
    };
  };
  mfsOptionalInfo: {};
  mfsRequestInfo: {
    entityId: string;
  };
}

export interface GetTransactionsResponseInterface {
  statusCode: number;
  status: string;
  message: string;
  object: string;
}

export interface GetTransactionReportInterface {
  mfsCommonServiceRequest: {
    mfsAssistedTransaction: {};
    mfsSourceInfo: { channelId: string; surroundSystem: string };
    mfsTransactionInfo: {
      requestId: string;
      serviceType: string;
      timestamp: number;
    };
  };
  mfsOptionalInfo: {};
  mfsRequestInfo: {
    count: string;
    entityId: string;
    offSet: string;
    walletType: string;
  };
}

export interface GetTransactionReportResponseInterface {
  entityId: string;
  walletType: string;
  msisdn: string;
  transactionListInfo: {
    transactionInfo: Array<TransactionInfoResponseInterface>;
  };
  rowCount: string;
}

export interface TransactionInfoResponseInterface {
  transactionId: string;
  transactionStatus: string;
  transactionAmount: string;
  transactionCommission: null | string;
  transactionType: string;
  transactionInfo: null;
  transactionDate: string;
  transactionFees: null | string;
  transactionTax: null | string;
  transactionCharges: null | string;
  transactionRemarks: null | string;
  openingBalance: null | string;
  closingBalance: null | string;
  walletType: null | string;
  senderName: null | string;
  receiverName: null | string;
  senderMsisdn: null | string;
  receiverMsisdn: null | string;
  transactionName: null | string;
  timeStamp: string;
  rowCount: null | string;
  serviceName: null | string;
  printFlag: null | string;
  accountId: null | string;
  promoAmount: null | string;
  terminalId: null | string;
  feeAmount: null | string;
  pan: null | string;
}

export interface DownloadPDFInterface {
  entityId: string;
  fromDate: string;
  toDate: string;
}

export interface SettlementInterface {
  id: number;
  merchantId: string;
  outletId: string;
  settlementType: string;
  createdAt: string;
  updatedAt: string | null;
  settlementStatus: string;
  walletTnxId: string;
  amountSettled: number;
  scheduled: boolean;
  eventType: string;
  scheduleId: number;
  settledBy: string;
  outletName: string;
}

export interface ResentSettlementInterface {
  statusCode: number;
  status: string;
  message: string;
  object: Array<SettlementInterface>;
}

export interface GetBalanceInquiryInterface {
  mfsCommonServiceRequest: {
    mfsAssistedTransaction: {};
    mfsSourceInfo: { channelId: string; surroundSystem: string };
    mfsTransactionInfo: {
      requestId: string;
      serviceType: string;
      timestamp: number;
    };
  };
  mfsOptionalInfo: {};
  mfsRequestInfo: {
    benificiaryAccount: string;
    bin: string;
  };
}

export interface GetBalanceInquiryResponseInterface {
destinationInstitutionCode: string;
accountNumer: string;
coustomerRefNumber: string | null;
destinationName: string;
issuerName: string | null;
gmtTransDateTime: string | null;
localTransDateTime: string | null;
stan: string | null;
uniqueTrxId: string | null;
responseCode: string;
transactionCode: string | null;
}

export interface GetBalanceManagementEnquiryResponseInterface {
    info: Array<{key: string; value: string}>;
}
