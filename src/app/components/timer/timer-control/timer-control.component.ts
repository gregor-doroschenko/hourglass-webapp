import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimeTracker } from '../../../services/timer/timer.interface';
import { Projects, Project } from '../../../services/redmine/redmine.interface';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimerControlComponent implements OnInit {

  @Input() timeTracker: Partial<TimeTracker> = {};
  @Input() projects: Project[];
  @Input() isLoading: boolean;
  @Input() isRunning: boolean;

  @Output() startTimerEvent: EventEmitter<Partial<TimeTracker>> = new EventEmitter<Partial<TimeTracker>>();
  @Output() stopTimerEvent: EventEmitter<number> = new EventEmitter<number>();

  currentTime$: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.currentTime$ = interval(1000).pipe(
      map((x) => {
        if (this.isRunning) {
          return this.getTimeDifference(this.timeTracker.created_at);
        }
      })
    );
  }

  getTimeDifference(startTime: string): number {
    const start = new Date(startTime).getTime();
    const now = Date.now();
    const diff = now - start;
    const result = new Date(diff);
    result.setHours(result.getUTCHours());
    result.setMinutes(result.getUTCMinutes());
    result.setSeconds(result.getSeconds());
    return result.getTime();
  }

  start() {
    this.startTimerEvent.emit(this.timeTracker);
  }

  stop() {
    this.stopTimerEvent.emit(this.timeTracker.id);
    this.timeTracker = {};
  }

}
