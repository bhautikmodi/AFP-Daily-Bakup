import { TestBed, inject } from '@angular/core/testing';

import { CompetencyAreaService } from './competency-area.service';

describe('CompetencyAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompetencyAreaService]
    });
  });

  it('should be created', inject([CompetencyAreaService], (service: CompetencyAreaService) => {
    expect(service).toBeTruthy();
  }));
});
