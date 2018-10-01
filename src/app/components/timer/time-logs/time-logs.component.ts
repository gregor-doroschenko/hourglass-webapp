import { Component, Input, OnInit } from '@angular/core';
import { TimeTracker } from '../../../services/timer/timer.interface';

@Component({
  selector: 'app-time-logs',
  templateUrl: './time-logs.component.html',
  styleUrls: ['./time-logs.component.scss']
})
export class TimeLogsComponent implements OnInit {

  @Input() timeLogs: TimeTracker[];

  groupedTimeLogs: any;

  constructor() { }

  ngOnInit() {
    this.sortByDate();
    this.timeLogs.map(timeLog => {
      timeLog.diff_time = this.getTimeDifference(timeLog.start, timeLog.stop);
      return timeLog;
    });
  }

  sortByDate() {
    this.timeLogs.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }

  getTimeDifference(startTime: string, stopTime: string): number {
    const start = new Date(startTime).getTime();
    const stop = new Date(stopTime).getTime();
    const diff = stop - start;
    const result = new Date(diff);
    result.setHours(result.getUTCHours());
    result.setMinutes(result.getUTCMinutes());
    result.setSeconds(result.getSeconds());
    return result.getTime();
  }

}
