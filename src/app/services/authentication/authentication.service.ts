import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { defaults } from '../../defaults';
import { UserObject } from '../user/user.interface';

const currentUserAuthTokenKey: string = 'currentUserAuthToken';
const redmineApiUrlKey: string = 'redmineApiUrl';
const expirationDateKey: string = 'expirationDate';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usersUrl: string = '/users/current.json';

  redirectUrl: string;

  constructor(private http: HttpClient) { }

  private setExpirationDate(rememberMe: boolean = false) {
    const currentDate = new Date();
    let newExpirationDate = currentDate.setHours(currentDate.getHours() + 4);
    if (rememberMe) {
      newExpirationDate = currentDate.setDate(currentDate.getDate() + 7);
    }
    const expirationDate = localStorage.getItem(expirationDateKey);
    if (expirationDate) {
      localStorage.removeItem(expirationDateKey);
    }
    localStorage.setItem(expirationDateKey, JSON.stringify(newExpirationDate));
  }

  private getExpirationDate(): number {
    const expirationDate = localStorage.getItem(expirationDateKey);
    if (expirationDate) {
      return JSON.parse(expirationDate);
    }
    return null;
  }

  isExpirationDateValid(): boolean {
    const currentDate = Date.now();
    const expirationDate = this.getExpirationDate();
    if (currentDate >= expirationDate) {
      this.clearLocalStorage();
      return false;
    }
    return true;
  }

  private setRedmineApiUrl(redmineUrl: string) {
    const redmineApiUrl = localStorage.getItem(redmineApiUrlKey);
    if (redmineApiUrl) {
      localStorage.removeItem(redmineApiUrlKey);
    }
    localStorage.setItem(redmineApiUrlKey, this.prepareRedmineUrl(redmineUrl));
  }

  getRedmineApiUrl(): string {
    const redmineUrl = localStorage.getItem(redmineApiUrlKey);
    if (redmineUrl) {
      return redmineUrl;
    }
    return null;
  }

  private prepareRedmineUrl(url: string): string {
    const lastChar = url.slice(-1);
    if (lastChar === '/') {
      return url.slice(0, url.length - 1);
    }
    return url;
  }

  checkIfRedmineUrlExist(): boolean {
    return !!this.getRedmineApiUrl();
  }

  private setAuthToken(token: string) {
    const tokenString = localStorage.getItem(currentUserAuthTokenKey);
    if (tokenString) {
      localStorage.removeItem(currentUserAuthTokenKey);
    }
    localStorage.setItem(currentUserAuthTokenKey, token);
  }

  getAuthToken(): string {
    const tokenString = localStorage.getItem(currentUserAuthTokenKey);
    if (tokenString) {
      return tokenString;
    }
    return null;
  }

  login(redmineUrl: string, apiKey: string, rememberMe: boolean = false): Observable<any> {
    this.setRedmineApiUrl(redmineUrl);
    this.setAuthToken(apiKey);
    const url = environment.corsProxyUrl + this.getRedmineApiUrl() + this.usersUrl;
    let headers: HttpHeaders = defaults.getDefaultHeaders();
    if (this.getRedmineApiUrl() && this.getAuthToken()) {
      headers = headers.append('X-Redmine-API-Key', this.getAuthToken());
    }

    return this.http.get<UserObject>(url, { headers: headers })
      .pipe(map((res: UserObject) => {
        this.setExpirationDate(rememberMe);
        return res;
      }));
  }

  logout() {
    this.clearLocalStorage();
  }

  private clearLocalStorage() {
    localStorage.clear();
  }
}
