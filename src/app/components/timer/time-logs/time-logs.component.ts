import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TimeTracker, TimeBookings, TimeBooking } from '../../../services/timer/timer.interface';
import { Projects, Project } from '../../../services/redmine/redmine.interface';

@Component({
  selector: 'app-time-logs',
  templateUrl: './time-logs.component.html',
  styleUrls: ['./time-logs.component.scss']
})
export class TimeLogsComponent implements OnInit, OnChanges {

  @Input() timeLogs: TimeTracker[];
  @Input() timeBookings: TimeBooking[];
  @Input() projects: Project[];

  groupedTimeLogs: any;

  constructor() { }

  ngOnInit() {
    this.sortByDate();
    this.timeLogs.map(timeLog => {
      timeLog.diff_time = this.getTimeDifference(timeLog.start, timeLog.stop);
      return timeLog;
    });
  }

  ngOnChanges() {
    this.assignProject();
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

  assignProject() {
    if (this.timeBookings && this.projects) {
      for (const item of this.timeLogs) {
        const booking = this.timeBookings.find(x => x.time_log_id === item.id);
        if (booking) {
          item.project = this.projects.find(x => x.id === booking.time_entry.project_id);
        }
      }
    }
  }

}
