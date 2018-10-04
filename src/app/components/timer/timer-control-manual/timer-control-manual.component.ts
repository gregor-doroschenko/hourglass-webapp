import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../services/redmine/redmine.interface';
import { TimeTracker } from '../../../services/timer/timer.interface';

@Component({
  selector: 'app-timer-control-manual',
  templateUrl: './timer-control-manual.component.html',
  styleUrls: ['./timer-control-manual.component.scss']
})
export class TimerControlManualComponent implements OnInit {

  @Input() projects: Project[];
  @Input() timeTracker: Partial<TimeTracker> = {};
  @Input() userId: number;
  @Input() isLoading = false;

  @Output() addManualTimeEntryEvent: EventEmitter<Partial<TimeTracker>[]> = new EventEmitter<Partial<TimeTracker>[]>();

  inputDate: Date;
  inputStart: string;
  inputEnd: string;

  constructor() { }

  ngOnInit() {
    this.inputDate = new Date();
    this.inputStart = this.inputDate.getHours().toString().padStart(2, '0') +
        ':' + this.inputDate.getMinutes().toString().padStart(2, '0');
    this.inputEnd = this.inputDate.getHours().toString().padStart(2, '0') +
        ':' + (this.inputDate.getMinutes() + 1).toString().padStart(2, '0');
    this.timeTracker.billable = true;
  }

  add() {
    const startTime = this.inputStart.split(':');
    const endTime = this.inputEnd.split(':');
    const start = new Date(this.inputDate).setHours(+startTime[0], +startTime[1], 0, 0);
    const stop = new Date(this.inputDate).setHours(+endTime[0], +endTime[1], 0, 0);

    const newTimelog: Partial<TimeTracker>[] = [{
      start: new Date(start).toISOString(),
      stop: new Date(stop).toISOString(),
      user_id: this.userId,
      project_id: this.timeTracker.project_id ? this.timeTracker.project_id : null,
      issue_id: this.timeTracker.issue_id ? this.timeTracker.issue_id : null,
      comments: this.timeTracker.comments ? this.timeTracker.comments : null,
      activity_id: this.timeTracker.billable ? 13 : 14
    }];

    this.addManualTimeEntryEvent.emit(newTimelog);
    this.timeTracker = {};
    this.ngOnInit();
  }
}
