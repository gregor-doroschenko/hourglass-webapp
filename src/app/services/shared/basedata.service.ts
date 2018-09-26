import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasedataService {

  constructor(protected authenticationService: AuthenticationService) { }

  protected getFullUrl(apiRelativeEndpoint: string): string {
    return environment.corsProxyUrl + this.authenticationService.getRedmineApiUrl() + apiRelativeEndpoint;
  }
}
