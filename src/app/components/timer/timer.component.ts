import { Component, OnInit } from '@angular/core';
import { TimeBookings, TimeTracker, TimeTrackers } from '../../services/timer/timer.interface';
import { TimerService } from '../../services/timer/timer.service';
import { UserService } from '../../services/user/user.service';

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
  isTimeLogsLoading: boolean;
  isTimeBookingsLoading: boolean;

  constructor(private timerService: TimerService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.getCurrentTimer();
    this.getTimeLogs();
    this.getTimeBookings();
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

}
