import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { BasedataService } from '../shared/basedata.service';
import { TimeTracker, TimeTrackerObject, TimeTrackers } from './timer.interface';

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

  startTimeTracker(timeTracker: Partial<TimeTracker>): Observable<TimeTracker> {
    const endpoint = this.getFullEndpointUrl(this.startTimeTrackerUrl);
    const body: TimeTrackerObject = {
      time_tracker: timeTracker
    };
    return this.http.post<TimeTracker>(endpoint, JSON.stringify(body));
  }

  stopTimeTracker(timerId: number): Observable<TimeTracker> {
    const endpoint = this.getFullEndpointUrl(this.timeTrackersUrl + '/' + timerId + '/stop');
    return this.http.delete<TimeTracker>(endpoint);
  }

  getCurrentTimeTrackers(): Observable<TimeTrackers> {
    const endpoint = this.getFullEndpointUrl(this.timeTrackersUrl);
    return this.http.get<TimeTrackers>(endpoint);
  }

  getTimeLogs(): Observable<TimeTrackers> {
    const endpoint = this.getFullEndpointUrl(this.timeLogsUrl);
    return this.http.get<TimeTrackers>(endpoint);
  }
}
