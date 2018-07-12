import { TestBed, inject } from '@angular/core/testing';

import { KsaService } from './ksa.service';

describe('KsaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KsaService]
    });
  });

  it('should be created', inject([KsaService], (service: KsaService) => {
    expect(service).toBeTruthy();
  }));
});
