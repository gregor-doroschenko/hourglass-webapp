import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GroupedTimeLogs, TimeTracker, TimeBooking } from '../../../services/timer/timer.interface';
import { TimelogDeleteDialogComponent } from './timelog-delete-dialog/timelog-delete-dialog.component';
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

  @Output() deleteTimeLogEvent: EventEmitter<number> = new EventEmitter<number>();

  today: number;
  groupedTimeLogs: GroupedTimeLogs[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    const today = new Date(Date.now()).setHours(0, 0, 0, 0);
    this.today = new Date(today).getTime();
    this.sortByDate();
    this.timeLogs.map(timeLog => {
      timeLog.diff_time = this.getTimeDifference(timeLog.start, timeLog.stop);
      return timeLog;
    });
    this.groupTimeLogsByDate();
  }

  getDaysForLastTwoWeeks(): number[] {
    const now = Date.now();
    const currentDate = new Date(now).getDate();
    let twoWeeksCount = 14;
    const allDays: number[] = [];
    while (twoWeeksCount >= 0) {
      let date = new Date(now).setDate(-twoWeeksCount + currentDate);
      date = new Date(date).setHours(0, 0, 0, 0);
      allDays.push(new Date(date).getTime());
      twoWeeksCount--;
    }
    return allDays.sort((a, b) => b - a);
  }

  groupTimeLogsByDate() {
    const lastTwoWeeksDays = this.getDaysForLastTwoWeeks();
    lastTwoWeeksDays.forEach((day, index) => {
      const group: GroupedTimeLogs = {
        int_date: day,
        time_logs: []
      };
      const timeLogs = this.timeLogs.filter(timelog => {
        const timelogDate = new Date(timelog.start).setHours(0, 0, 0, 0);
        if (new Date(timelogDate).getTime() === new Date(day).getTime()) {
          return timelog;
        }
      });
      if (timeLogs.length !== 0) {
        group.time_logs = timeLogs;
      }
      this.groupedTimeLogs[index] = group;
    });
  }

  ngOnChanges() {
    this.assignProject();
  }

  sortByDate() {
    this.timeLogs.sort((a, b) => {
      return new Date(b.start).getTime() - new Date(a.start).getTime();
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

  openDeleteDialog(timeLogId: number) {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(TimelogDeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.deleteTimeLogEvent.emit(timeLogId);
        this.deleteTimeLogFromList(timeLogId);
      }
    });
  }

  deleteTimeLogFromList(timeLogId: number) {
    const timelogIndex = this.timeLogs.findIndex(timelog => timelog.id === timeLogId);
    if (timelogIndex !== -1) {
      this.timeLogs.splice(timelogIndex, 1);
      this.groupTimeLogsByDate();
    }
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
