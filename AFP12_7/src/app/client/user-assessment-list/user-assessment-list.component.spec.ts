import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentListComponent } from './user-assessment-list.component';

describe('UserAssessmentListComponent', () => {
  let component: UserAssessmentListComponent;
  let fixture: ComponentFixture<UserAssessmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
