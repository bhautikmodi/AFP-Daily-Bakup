import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingComponent } from './remaining.component';

describe('RemainingComponent', () => {
  let component: RemainingComponent;
  let fixture: ComponentFixture<RemainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
