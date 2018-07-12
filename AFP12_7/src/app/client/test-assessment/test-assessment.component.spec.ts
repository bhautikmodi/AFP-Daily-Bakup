import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssessmentComponent } from './test-assessment.component';

describe('TestAssessmentComponent', () => {
  let component: TestAssessmentComponent;
  let fixture: ComponentFixture<TestAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
