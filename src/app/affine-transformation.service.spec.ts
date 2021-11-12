import { TestBed } from '@angular/core/testing';

import { AffineTransformationService } from './affine-transformation.service';

describe('AffineTransformationService', () => {
  let service: AffineTransformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffineTransformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
