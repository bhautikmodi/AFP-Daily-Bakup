import { TestBed, inject } from '@angular/core/testing';

import { ThankyouService } from './thankyou.service';

describe('ThankyouService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThankyouService]
    });
  });

  it('should be created', inject([ThankyouService], (service: ThankyouService) => {
    expect(service).toBeTruthy();
  }));
});
