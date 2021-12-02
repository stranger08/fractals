import { TestBed } from '@angular/core/testing';

import { LSystemsService } from './lsystems.service';

describe('LSystemsService', () => {
  let service: LSystemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LSystemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
