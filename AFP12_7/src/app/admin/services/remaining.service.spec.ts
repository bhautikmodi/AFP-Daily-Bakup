import { TestBed, inject } from '@angular/core/testing';

import { RemainingService } from './remaining.service';

describe('RemainingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemainingService]
    });
  });

  it('should be created', inject([RemainingService], (service: RemainingService) => {
    expect(service).toBeTruthy();
  }));
});
