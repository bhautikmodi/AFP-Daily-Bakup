import { TestBed, inject } from '@angular/core/testing';

import { EmailtemplateService } from './emailtemplate.service';

describe('EmailtemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailtemplateService]
    });
  });

  it('should be created', inject([EmailtemplateService], (service: EmailtemplateService) => {
    expect(service).toBeTruthy();
  }));
});
