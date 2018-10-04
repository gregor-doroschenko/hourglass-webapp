import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Projects } from '../../services/redmine/redmine.interface';
import { RedmineService } from '../../services/redmine/redmine.service';
import { TimeBookings, TimeTracker, TimeTrackers } from '../../services/timer/timer.interface';
import { TimerService } from '../../services/timer/timer.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimerComponent implements OnInit {

  currentTimeTracker: Partial<TimeTracker> = {};
  isLoading: boolean;
  isRunning: boolean;

  userId: number;

  timeLogs: TimeTrackers;
  timeBookings: TimeBookings;
  projects: Projects;
  isTimeLogsLoading: boolean;
  isTimeBookingsLoading: boolean;
  isProjectsLoading: boolean;
  isAutomaticMode = true;

  constructor(private timerService: TimerService,
              private redmineService: RedmineService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.getCurrentTimer();
    this.loadData();
  }

  startTimer(timeTracker: Partial<TimeTracker>) {
    this.isLoading = true;
    this.timerService.startTimeTracker(timeTracker).subscribe(result => {
      this.currentTimeTracker = result;
      this.isRunning = true;
      this.isLoading = false;
    }, error => {
      console.log('error');
      this.isLoading = false;
    });
  }

  stopTimer(timerId: number) {
    this.isLoading = true;
    this.timerService.stopTimeTracker(timerId).subscribe(result => {
      this.isRunning = false;
      this.isLoading = false;
      this.loadData();
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  getCurrentTimer() {
    this.timerService.getCurrentTimeTrackers().subscribe(currentTimeTrackers => {
      if (currentTimeTrackers.count !== 0) {
        const records = currentTimeTrackers.records;
        const currentUserRecord = records.find(record => record.user_id === this.userId);
        if (currentUserRecord) {
          this.currentTimeTracker = currentUserRecord;
          this.isRunning = true;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  private getRandomColor (projectName: string) {
    projectName = projectName.replace(/[^a-f0-9]/gi, '');
    projectName = projectName.padStart(6, '000').slice(-6);
    return '#' + projectName.toUpperCase();
  }

  loadData() {
    this.isLoading = true;
    this.isTimeLogsLoading = true;
    this.isTimeBookingsLoading = true;
    this.isProjectsLoading = true;

    const calls: Observable<any>[] = [];

    calls.push(this.timerService.getTimeLogs());
    calls.push(this.timerService.getTimeBookings());
    calls.push(this.redmineService.getProjects());

    forkJoin(calls).subscribe((data) => {
      this.timeLogs = data[0];
      this.timeBookings = data[1];
      this.projects = data[2];

      this.projects.projects.forEach(x => x.color = this.getRandomColor(x.name));

      this.isTimeLogsLoading = false;
      this.isTimeBookingsLoading = false;
      this.isProjectsLoading = false;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isTimeLogsLoading = false;
      this.isTimeBookingsLoading = false;
      this.isProjectsLoading = false;
      this.isLoading = false;
    });
  }

  getTimlogDeleteEvent(timeLogId: number) {
    this.timerService.deleteTimeLog(timeLogId).subscribe(result => {
      console.log('time entry deleted');
    }, error => {
      console.log(error);
    });
  }

  getAddManualTimeEntryEvent(newTimeLogs: Partial<TimeTracker>[]) {
    this.timerService.createTimeLogs(newTimeLogs).subscribe(result => {
      console.log(result);
      this.loadData();
    }, error => {
      console.log(error);
    });
  }

}
