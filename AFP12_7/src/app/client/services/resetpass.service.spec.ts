import { TestBed, inject } from '@angular/core/testing';

import { ResetpassService } from './resetpass.service';

describe('ResetpassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetpassService]
    });
  });

  it('should be created', inject([ResetpassService], (service: ResetpassService) => {
    expect(service).toBeTruthy();
  }));
});
