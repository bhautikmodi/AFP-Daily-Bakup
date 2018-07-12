import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyAreaListComponent } from './competency-area-list.component';

describe('CompetencyAreaListComponent', () => {
  let component: CompetencyAreaListComponent;
  let fixture: ComponentFixture<CompetencyAreaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyAreaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
