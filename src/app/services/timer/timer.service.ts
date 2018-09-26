import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { BasedataService } from '../shared/basedata.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService extends BasedataService {

  private timeTrackersUrl: string = '/hourglass/time_trackers';
  private startTimeTrackerUrl: string = '/hourglass/time_trackers/start';
  private timeLogsUrl: string = '/hourglass/time_logs';

  constructor(protected authenticationService: AuthenticationService,
              private http: HttpClient) {
    super(authenticationService);
  }

  private getFullEndpointUrl(path: string): string {
    return super.getFullUrl(path + '.json');
  }

  startTimeTracker(message: string): Observable<any> {
    const endpoint = this.getFullEndpointUrl(this.startTimeTrackerUrl);
    const body = {
      comments: message
    };
    return this.http.post<any>(endpoint, JSON.stringify(body));
  }

  getTimeTrackers(): Observable<any> {
    const endpoint = this.getFullEndpointUrl(this.timeTrackersUrl);
    return this.http.get(endpoint);
  }

  getTimeLogs(): Observable<any> {
    const endpoint = this.getFullEndpointUrl(this.timeLogsUrl);
    return this.http.get<any>(endpoint);
  }
}
