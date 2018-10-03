import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TimeTracker } from '../../../services/timer/timer.interface';
import { TimelogDeleteDialogComponent } from './timelog-delete-dialog/timelog-delete-dialog.component';

@Component({
  selector: 'app-time-logs',
  templateUrl: './time-logs.component.html',
  styleUrls: ['./time-logs.component.scss']
})
export class TimeLogsComponent implements OnInit {

  @Input() timeLogs: TimeTracker[];

  @Output() deleteTimeLogEvent: EventEmitter<number> = new EventEmitter<number>();
  groupedTimeLogs: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.sortByDate();
    this.timeLogs.map(timeLog => {
      timeLog.diff_time = this.getTimeDifference(timeLog.start, timeLog.stop);
      return timeLog;
    });
  }

  sortByDate() {
    this.timeLogs.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
    }
  }

}
