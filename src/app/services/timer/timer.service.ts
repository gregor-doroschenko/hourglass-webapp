import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { BasedataService } from '../shared/basedata.service';
import { TimeBookings, TimeLogsObject, TimeTracker, TimeTrackerObject, TimeTrackers } from './timer.interface';

@Injectable({
  providedIn: 'root'
})
export class TimerService extends BasedataService {

  private timeTrackersUrl = '/hourglass/time_trackers';
  private startTimeTrackerUrl = '/hourglass/time_trackers/start';
  private timeLogsUrl = '/hourglass/time_logs';
  private timeBookingsUrl = '/hourglass/time_bookings';
  private timeLogsBulkCreate = '/bulk_create';

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

  deleteTimeLog(timeLogId: number): Observable<any> {
    const endpoint = this.getFullEndpointUrl(this.timeLogsUrl + '/' + timeLogId);
    return this.http.delete<any>(endpoint);
  }

  getTimeBookings(): Observable<TimeBookings> {
    const endpoint = this.getFullEndpointUrl(this.timeBookingsUrl);
    return this.http.get<TimeBookings>(endpoint);
  }

  createTimeLogs(timeLogs: Partial<TimeTracker>[]): Observable<TimeTracker> {
    const endpoint = this.getFullEndpointUrl(this.timeLogsUrl + this.timeLogsBulkCreate);
    const saveObject: TimeLogsObject = {
      time_logs: timeLogs
    };
    return this.http.post<TimeTracker>(endpoint, JSON.stringify(saveObject));
  }
}
