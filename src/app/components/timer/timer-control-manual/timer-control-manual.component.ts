import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../services/redmine/redmine.interface';
import { TimeTracker, TimeEntry } from '../../../services/timer/timer.interface';
import { TimerService } from '../../../services/timer/timer.service';

@Component({
  selector: 'app-timer-control-manual',
  templateUrl: './timer-control-manual.component.html',
  styleUrls: ['./timer-control-manual.component.scss']
})
export class TimerControlManualComponent implements OnInit {

  @Input() projects: Project[];
  @Input() timeTracker: Partial<TimeTracker> = {};
  @Input() isLoading = false;

  model: TimeEntry;

  inputDate: Date;
  inputStart: string;
  inputEnd: string;

  constructor(private dataService: TimerService) { }

  ngOnInit() {
    this.inputDate = new Date();
    this.inputStart = this.inputDate.getHours().toString().padStart(2, '0') +
        ':' + this.inputDate.getMinutes().toString().padStart(2, '0');
    this.inputEnd = this.inputDate.getHours().toString().padStart(2, '0') +
        ':' + (this.inputDate.getMinutes() + 1).toString().padStart(2, '0');
  }

  onSubmit() {
    const startTime = this.inputStart.split(':');
    const endTime = this.inputEnd.split(':');
    const start = new Date(this.inputDate).setHours(+startTime[0], +startTime[1]);
    const stop = new Date(this.inputDate).setHours(+endTime[0], +endTime[1]);

    const diff = stop - start;
    console.log(start.toLocaleString());
    console.log(stop.toLocaleString());

    console.log(new Date(diff).getMinutes() / (3600 * 1000));

    // this.model.spent_on = new Date(this.inputDate).setUTCHours(+startTime[0], +startTime[1]).toString();

/*     this.dataService.postTimeTracker(this.timeTracker).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }); */
  }
}
