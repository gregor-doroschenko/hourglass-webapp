import { TestBed } from '@angular/core/testing';

import { RedmineService } from './redmine.service';

describe('RedmineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedmineService = TestBed.get(RedmineService);
    expect(service).toBeTruthy();
  });
});
