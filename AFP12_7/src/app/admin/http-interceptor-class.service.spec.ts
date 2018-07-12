import { TestBed, inject } from '@angular/core/testing';

import { HttpInterceptorClassService } from './http-interceptor-class.service';

describe('HttpInterceptorClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptorClassService]
    });
  });

  it('should be created', inject([HttpInterceptorClassService], (service: HttpInterceptorClassService) => {
    expect(service).toBeTruthy();
  }));
});
