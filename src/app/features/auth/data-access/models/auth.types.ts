export interface GetTokenInterface {
  mfsCommonServiceRequest: {
    mfsSourceInfo: {
      channelId: string;
      surroundSystem: string;
    };
    mfsTransactionInfo: {
      requestId: string;
      serviceType: string;
      timestamp: string;
    };
  };
}

export interface VerifyOtpInterface {
  mfsCommonServiceRequest: {
    mfsAssistedTransaction: {};
    mfsSourceInfo: {
      channelId: string;
      surroundSystem: string;
    };
    mfsTransactionInfo: {
      requestId: number;
      serviceType: string;
      timestamp: number;
    };
  };
  mfsOptionalInfo: {};
  mfsRequestInfo: {
    bankDetails: {};
    deviceId: string;
    deviceIp: string;
    entityId: string;
    entityType: string;
    fieldList: {};
    grossAmt: number;
    language: string;
    netAmt: number;
    orderNum: number;
    phone: number;
    token: string;
    vehicleType: number;
  };
}

export interface GetUserInfoInterface {
  mfsCommonServiceRequest: {
    mfsSourceInfo: {
      channelId: number;
      surroundSystem: number;
    };
    mfsTransactionInfo: {
      requestId: string;
      serviceType: string;
      timestamp: number;
    };
  };
  mfsRequestInfo: {
    customerMsisdn: string;
  };
}

export interface TransactionHistoryInterface {
  mfsCommonServiceRequest: {
    mfsSourceInfo: {
      channelId: number;
      surroundSystem: number;
    };
    mfsTransactionInfo: {
      requestId: string;
      serviceType: string;
      timestamp: number;
    };
  };
  mfsRequestInfo: {
    entityId: string;
    lang: string;
    walletType: string;
  };
}


export interface SendOtpInterface {
  mfsCommonServiceRequest: {
    mfsAssistedTransaction: {};
    mfsSourceInfo: {
      channelId: string;
      surroundSystem: string;
    };
    mfsTransactionInfo: {
      requestId: string;
      serviceType: string;
      timestamp: number;
    };
  };
  mfsOptionalInfo: {};
  mfsRequestInfo: {
    entityType: string;
    language: string;
    length: string;
    msisdn: string;
    notificationFlag: string;
  };
}