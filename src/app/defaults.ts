import { HttpHeaders } from '@angular/common/http';

export const defaults = {
  getDefaultHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return headers;
  }
};
