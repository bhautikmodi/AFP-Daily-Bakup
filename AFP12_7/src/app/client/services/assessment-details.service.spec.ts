import { TestBed, inject } from '@angular/core/testing';

import { AssessmentDetailsService } from './assessment-details.service';

describe('AssessmentDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentDetailsService]
    });
  });

  it('should be created', inject([AssessmentDetailsService], (service: AssessmentDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
