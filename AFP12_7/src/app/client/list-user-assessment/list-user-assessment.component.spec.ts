import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAssessmentComponent } from './list-user-assessment.component';

describe('ListUserAssessmentComponent', () => {
  let component: ListUserAssessmentComponent;
  let fixture: ComponentFixture<ListUserAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
