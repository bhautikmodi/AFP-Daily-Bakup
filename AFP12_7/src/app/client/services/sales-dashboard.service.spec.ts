import { TestBed, inject } from '@angular/core/testing';

import { SalesDashboardService } from './sales-dashboard.service';

describe('SalesDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesDashboardService]
    });
  });

  it('should be created', inject([SalesDashboardService], (service: SalesDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
