import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyAreaComponent } from './competency-area.component';

describe('CompetencyAreaComponent', () => {
  let component: CompetencyAreaComponent;
  let fixture: ComponentFixture<CompetencyAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
