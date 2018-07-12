import { TestBed, inject } from '@angular/core/testing';

import { CourselevelService } from './courselevel.service';

describe('CourselevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourselevelService]
    });
  });

  it('should be created', inject([CourselevelService], (service: CourselevelService) => {
    expect(service).toBeTruthy();
  }));
});
