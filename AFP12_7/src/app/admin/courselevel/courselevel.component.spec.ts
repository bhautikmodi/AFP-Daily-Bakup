import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourselevelComponent } from './courselevel.component';

describe('CourselevelComponent', () => {
  let component: CourselevelComponent;
  let fixture: ComponentFixture<CourselevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourselevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourselevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
