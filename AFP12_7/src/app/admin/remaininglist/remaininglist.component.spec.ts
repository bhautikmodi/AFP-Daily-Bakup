import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemaininglistComponent } from './remaininglist.component';

describe('RemaininglistComponent', () => {
  let component: RemaininglistComponent;
  let fixture: ComponentFixture<RemaininglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemaininglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemaininglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
