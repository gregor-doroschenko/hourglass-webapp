import { TestBed } from '@angular/core/testing';

import { BasedataService } from './basedata.service';

describe('BasedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasedataService = TestBed.get(BasedataService);
    expect(service).toBeTruthy();
  });
});
