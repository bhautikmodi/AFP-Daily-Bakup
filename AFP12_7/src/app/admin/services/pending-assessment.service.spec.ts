import { TestBed, inject } from '@angular/core/testing';

import { PendingAssessmentService } from './pending-assessment.service';

describe('PendingAssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingAssessmentService]
    });
  });

  it('should be created', inject([PendingAssessmentService], (service: PendingAssessmentService) => {
    expect(service).toBeTruthy();
  }));
});
