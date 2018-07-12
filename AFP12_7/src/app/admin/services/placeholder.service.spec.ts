import { TestBed, inject } from '@angular/core/testing';

import { PlaceholderService } from './placeholder.service';

describe('PlaceholderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceholderService]
    });
  });

  it('should be created', inject([PlaceholderService], (service: PlaceholderService) => {
    expect(service).toBeTruthy();
  }));
});
