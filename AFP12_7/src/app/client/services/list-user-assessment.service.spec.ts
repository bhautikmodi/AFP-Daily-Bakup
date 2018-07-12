import { TestBed, inject } from '@angular/core/testing';

import { ListUserAssessmentService } from './list-user-assessment.service';

describe('ListUserAssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListUserAssessmentService]
    });
  });

  it('should be created', inject([ListUserAssessmentService], (service: ListUserAssessmentService) => {
    expect(service).toBeTruthy();
  }));
});
