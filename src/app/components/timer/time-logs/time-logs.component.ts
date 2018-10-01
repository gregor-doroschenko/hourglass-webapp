import { Component, Input, OnInit } from '@angular/core';
import { TimeTracker } from '../../../services/timer/timer.interface';

@Component({
  selector: 'app-time-logs',
  templateUrl: './time-logs.component.html',
  styleUrls: ['./time-logs.component.scss']
})
export class TimeLogsComponent implements OnInit {

  @Input() timeLogs: TimeTracker[];

  constructor() { }

  ngOnInit() { }

}
