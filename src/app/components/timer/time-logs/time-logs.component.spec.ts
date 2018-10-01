import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLogsComponent } from './time-logs.component';

describe('TimeLogsComponent', () => {
  let component: TimeLogsComponent;
  let fixture: ComponentFixture<TimeLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
