import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAssessmentComponent } from './pending-assessment.component';

describe('PendingAssessmentComponent', () => {
  let component: PendingAssessmentComponent;
  let fixture: ComponentFixture<PendingAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
