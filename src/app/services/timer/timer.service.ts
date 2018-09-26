import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { BasedataService } from '../shared/basedata.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService extends BasedataService {

  constructor(protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }
}
