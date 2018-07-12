import { TestBed, inject } from '@angular/core/testing';

import { SalesUserService } from './sales-user.service';

describe('SalesUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesUserService]
    });
  });

  it('should be created', inject([SalesUserService], (service: SalesUserService) => {
    expect(service).toBeTruthy();
  }));
});
