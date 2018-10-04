import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeControlManualComponent } from './time-control-manual.component';

describe('TimeControlManualComponent', () => {
  let component: TimeControlManualComponent;
  let fixture: ComponentFixture<TimeControlManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeControlManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeControlManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
