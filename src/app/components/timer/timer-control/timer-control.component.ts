import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../../services/timer/timer.service';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.scss']
})
export class TimerControlComponent implements OnInit {

  constructor(private timerService: TimerService) { }

  ngOnInit() {
  }

  startTest() {
    this.timerService.startTimeTracker('Das ist Test').subscribe(res => {
      console.log(res);
      console.log('started');
    }, error => {
      console.log('error');
    });
  }

  getTest() {
    this.timerService.getTimeTrackers().subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  getTimeLogs() {
    this.timerService.getTimeLogs().subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

}
