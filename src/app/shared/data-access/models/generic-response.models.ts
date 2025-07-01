export interface GenericResInterface<T> {
  mfsCommonServiceResponse: {
    mfsStatusInfo: {
      status: 'Failure' | 'Success';
      errorCode: number;
      errorDescription: string;
    };
    mfsTransactionInfo: {
      timestamp: string;
      requestId: string;
      responseId: string;
    };
  };
  mfsResponseInfo: T;
  mfsOptionalInfo: any;
}

export type StatusState = 'pending' | 'loading' | 'success' | 'error';
