import { Component, OnInit } from '@angular/core';
import { TimeTracker } from '../../../services/timer/timer.interface';
import { TimerService } from '../../../services/timer/timer.service';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.scss']
})
export class TimerControlComponent implements OnInit {

  timeTracker: Partial<TimeTracker> = {};
  isLoading: boolean;

  constructor(private timerService: TimerService) { }

  ngOnInit() { }

  startTimer() {
    this.isLoading = true;
    this.timerService.startTimeTracker(this.timeTracker).subscribe(result => {
      console.log(result);
      this.timeTracker = result;
      this.isLoading = false;
    }, error => {
      console.log('error');
      this.isLoading = false;
    });
  }

}
