import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../services/redmine/redmine.interface';
import { TimeTracker, TimeEntry } from '../../../services/timer/timer.interface';
import { RedmineService } from '../../../services/redmine/redmine.service';

@Component({
  selector: 'app-timer-control-manual',
  templateUrl: './timer-control-manual.component.html',
  styleUrls: ['./timer-control-manual.component.scss']
})
export class TimerControlManualComponent implements OnInit {

  @Input() projects: Project[];
  @Input() timeTracker: Partial<TimeTracker> = {};
  @Input() isLoading = false;

  @Output() addManualTimeEntryEvent: EventEmitter<any> = new EventEmitter<any>();

  model: TimeEntry;

  inputDate: Date;
  inputStart: string;
  inputEnd: string;

  constructor(private dataService: RedmineService) { }

  ngOnInit() {
    this.inputDate = new Date();
    this.inputStart = this.inputDate.getHours().toString().padStart(2, '0') +
        ':' + this.inputDate.getMinutes().toString().padStart(2, '0');
    this.inputEnd = this.inputDate.getHours().toString().padStart(2, '0') +
        ':' + (this.inputDate.getMinutes() + 1).toString().padStart(2, '0');
  }

  add() {
    const startTime = this.inputStart.split(':');
    const endTime = this.inputEnd.split(':');
    const start = new Date(this.inputDate).setHours(+startTime[0], +startTime[1]);
    const stop = new Date(this.inputDate).setHours(+endTime[0], +endTime[1]);

    const diff = stop - start;

    // TODO: Post/Put Timebooking
    this.dataService.postTimeTracker(this.model).subscribe(data => {

    });
  }
}
