import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelogDeleteDialogComponent } from './timelog-delete-dialog.component';

describe('TimelogDeleteDialogComponent', () => {
  let component: TimelogDeleteDialogComponent;
  let fixture: ComponentFixture<TimelogDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelogDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelogDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
