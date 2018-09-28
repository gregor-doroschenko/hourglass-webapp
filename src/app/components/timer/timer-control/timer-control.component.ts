import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeTracker } from '../../../services/timer/timer.interface';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.scss']
})
export class TimerControlComponent implements OnInit {

  @Input() timeTracker: Partial<TimeTracker> = {};
  @Input() isLoading: boolean;
  @Input() isRunning: boolean;

  @Output() startTimerEvent: EventEmitter<Partial<TimeTracker>> = new EventEmitter<Partial<TimeTracker>>();
  @Output() stopTimerEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  start() {
    this.startTimerEvent.emit(this.timeTracker);
  }

  stop() {
    this.stopTimerEvent.emit(this.timeTracker.id);
  }

}
