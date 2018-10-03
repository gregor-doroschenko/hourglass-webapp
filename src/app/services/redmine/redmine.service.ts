import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { BasedataService } from '../shared/basedata.service';
import { Projects } from './redmine.interface';

@Injectable({
  providedIn: 'root'
})
export class RedmineService extends BasedataService {

  private projectsUrl = '/projects';

  constructor(protected authenticationService: AuthenticationService,
              private http: HttpClient) {
    super(authenticationService);
  }

  private getFullEndpointUrl(path: string): string {
    return super.getFullUrl(path + '.json');
  }

  getProjects(): Observable<Projects> {
    const endpoint = this.getFullEndpointUrl(this.projectsUrl);
    return this.http.get<Projects>(endpoint);
  }
}
