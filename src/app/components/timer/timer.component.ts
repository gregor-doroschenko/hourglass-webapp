import { Component, OnInit } from '@angular/core';
import { TimeBookings, TimeTracker, TimeTrackers } from '../../services/timer/timer.interface';
import { TimerService } from '../../services/timer/timer.service';
import { UserService } from '../../services/user/user.service';
import { RedmineService } from '../../services/redmine/redmine.service';
import { Projects } from '../../services/redmine/redmine.interface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
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

  constructor(private timerService: TimerService,
              private redmineService: RedmineService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.getCurrentTimer();
    this.getTimeLogs();
    this.getTimeBookings();
    this.getProjects();
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
      this.getTimeLogs();
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

  getTimeLogs() {
    this.isTimeLogsLoading = true;
    this.timerService.getTimeLogs().subscribe(timeLogs => {
      this.timeLogs = timeLogs;
      this.isTimeLogsLoading = false;
    }, error => {
      console.log(error);
      this.isTimeLogsLoading = false;
    });
  }

  getTimeBookings() {
    this.isTimeBookingsLoading = true;
    this.timerService.getTimeBookings().subscribe(timeBookings => {
      this.timeBookings = timeBookings;
      this.isTimeBookingsLoading = false;
    }, error => {
      console.log(error);
      this.isTimeBookingsLoading = false;
    });
  }

  getProjects() {
    this.isProjectsLoading = true;
    this.redmineService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.isProjectsLoading = false;
      this.projects.projects.forEach(x => x.color = this.getRandomColor(x.name));
    }, error => {
      console.log(error);
      this.isProjectsLoading = false;
    });
  }

  private getRandomColor (projectName: string) {
    projectName = projectName.replace(/[^a-f0-9]/gi, '');
    projectName = projectName.padStart(6, '999').slice(-6);
    return '#' + projectName.toUpperCase();
   /*  const letters = '456789ABC';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 9)];
    }
    return color; */
  }

}
