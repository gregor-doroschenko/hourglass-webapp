import { Component, OnInit } from '@angular/core';
import { TimeTracker } from '../../services/timer/timer.interface';
import { TimerService } from '../../services/timer/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  currentTimeTracker: Partial<TimeTracker> = {};
  isLoading: boolean;
  isRunning: boolean;

  constructor(private timerService: TimerService) { }

  ngOnInit() { }

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
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

}
