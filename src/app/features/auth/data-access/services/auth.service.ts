import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '@app/shared/data-access/services/token/token.service';
import * as AuthTypes from '../models/auth.types';
import { environment } from '@environments/environment.development';
import { GenericResInterface } from '@app/shared/data-access/models/generic-response.models';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  getToken() {
    const payload: AuthTypes.GetTokenInterface = {
      mfsCommonServiceRequest: {
        mfsSourceInfo: {
          channelId: '23',
          surroundSystem: '1',
        },
        mfsTransactionInfo: {
          requestId: '1528888797115',
          serviceType: '0',
          timestamp: '1528888797115',
        },
      },
    };

    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YXBpQ2xpZW50OmFwaUNsaWVudFNlY3JldA=='
    );

    return this.http
      .post<GenericResInterface<any>>(
        `${environment.apiUrl}/mfs-transaction-management/authManagement/get`,
        payload,
        { headers }
      )
      .pipe(
        tap((res) => {
          this.tokenService.saveTokenToLS(res.mfsResponseInfo?.token);
        })
      );
  }

  sendOtp(msisdn: string) {
    const payload: AuthTypes.SendOtpInterface = {
      mfsCommonServiceRequest: {
        mfsAssistedTransaction: {},
        mfsSourceInfo: {
          channelId: '23',
          surroundSystem: '4',
        },
        mfsTransactionInfo: {
          requestId: '818182106616430892542516996012',
          serviceType: '0',
          timestamp: 1643089254639,
        },
      },
      mfsOptionalInfo: {},
      mfsRequestInfo: {
        entityType: '20',
        language: 'ENG',
        length: '6',
        msisdn,
        notificationFlag: '1',
      },
    };

    return this.http.post<GenericResInterface<any>>(
      `${environment.apiUrl}/mfs-transaction-management/tokenManagement/V2/get`,
      payload
    );
  }

  validateToken(token: string) {
    const params = new HttpParams({
      fromObject: {
        token,
      },
    });
    return this.http.get<GenericResInterface<any>>(
      `${environment.apiUrl}/mfs-authorization/oauth/check_token`,
      { params }
    );
  }

  verifyOtp(token: string) {
    const payload: AuthTypes.VerifyOtpInterface = {
      mfsCommonServiceRequest: {
        mfsAssistedTransaction: {},
        mfsSourceInfo: {
          channelId: '23',
          surroundSystem: '4',
        },
        mfsTransactionInfo: {
          requestId: 7438350824785369,
          serviceType: '0',
          timestamp: 1675678750898,
        },
      },
      mfsOptionalInfo: {},
      mfsRequestInfo: {
        bankDetails: {},
        deviceId: '1e391487f87646b2',
        deviceIp: '192.168.18.75',
        entityId: '9012017121',
        entityType: '23',
        fieldList: {},
        grossAmt: 0,
        language: 'ENG',
        netAmt: 0,
        orderNum: 0,
        phone: 0,
        token,
        vehicleType: 0,
      },
    };
    return this.http.post<GenericResInterface<any>>(
      `${environment.apiUrl}/mfs-transaction-management/tokenManagement/validate`,
      payload
    );
  }

  getUserInfo() {
    const payload: AuthTypes.GetUserInfoInterface = {
      mfsCommonServiceRequest: {
        mfsSourceInfo: {
          channelId: 23,
          surroundSystem: 1,
        },
        mfsTransactionInfo: {
          requestId: '8447220015329561229817922271',
          serviceType: '0',
          timestamp: 1532956122367,
        },
      },
      mfsRequestInfo: {
        customerMsisdn: '8030000032',
      },
    };

    return this.http.post<GenericResInterface<any>>(
      `${environment.apiUrl}/mfs-transaction-management/userManagement/getUserInfo`,
      payload
    );
  }

  transactionHistory() {
    const payload: AuthTypes.TransactionHistoryInterface = {
      mfsCommonServiceRequest: {
        mfsSourceInfo: {
          channelId: 23,
          surroundSystem: 1,
        },
        mfsTransactionInfo: {
          requestId: '8447220015329561229817922271',
          serviceType: '0',
          timestamp: 1532956122367,
        },
      },
      mfsRequestInfo: {
        entityId: '71000000041',
        lang: 'ENG',
        walletType: '1',
      },
    };

    return this.http.post<GenericResInterface<any>>(
      `${environment.apiUrl}/mfs-transaction-management/transactionManagement/history`,
      payload
    );
  }

  mewTransactionHistory() {
    const payload: AuthTypes.TransactionHistoryInterface = {
      mfsCommonServiceRequest: {
        mfsSourceInfo: {
          channelId: 23,
          surroundSystem: 1,
        },
        mfsTransactionInfo: {
          requestId: '8447220015329561229817922271',
          serviceType: '0',
          timestamp: 1532956122367,
        },
      },
      mfsRequestInfo: {
        entityId: '71000000041',
        lang: 'ENG',
        walletType: '1',
      },
    };

    return this.http.post<GenericResInterface<any>>(
      `${environment.apiUrl}/mfs-transaction-management/transactionManagement/newHistory`,
      payload
    );
  }
}
