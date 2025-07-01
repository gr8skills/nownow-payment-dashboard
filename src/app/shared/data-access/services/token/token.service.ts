import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface TokenResInterface{
    access_token: string;
    refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly router = inject(Router);
  private tokenKey = 'user-ac';
  private basicTokenKey = 'auth-t';

  private encryptToken(token: string) {
    return `eyjh.${token}`;
  }

  private decryptToken() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      return token.split('eyjh.')[1];
    }
    return null;
  }

  private encryptBasicToken(token: string) {
    return `eyjh.${token}`;
  }

  private decryptBasicToken() {
    const token = localStorage.getItem(this.basicTokenKey);
    if (token) {
      return token.split('eyjh.')[1];
    }
    return null;
  }

  saveTokenToLS(token: string) {
    const encryptedToken = this.encryptToken(token);
    localStorage.setItem(this.tokenKey, encryptedToken);
  }

  saveBasicTokenToLS(token: string) {
    const encryptedToken = this.encryptBasicToken(token);
    localStorage.setItem(this.basicTokenKey, encryptedToken);
  }

  get token() {
    return this.decryptToken();
  }

  get basicToken() {
    return this.decryptBasicToken();
  }

  get isAuthenticated() {
    return !!this.token;
  }

  get isBasicAuthenticated() {
    return !!this.basicToken;
  }

  deleteTokenAndRedirect() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth/login']);
  }

  deleteBasicTokenAndRedirect() {
    localStorage.removeItem(this.basicTokenKey);
    this.router.navigate(['/auth/login']);
  }
}