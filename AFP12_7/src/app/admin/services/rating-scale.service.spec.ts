import { TestBed, inject } from '@angular/core/testing';

import { RatingScaleService } from './rating-scale.service';

describe('RatingScaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingScaleService]
    });
  });

  it('should be created', inject([RatingScaleService], (service: RatingScaleService) => {
    expect(service).toBeTruthy();
  }));
});
