import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingScaleListComponent } from './rating-scale-list.component';

describe('RatingScaleListComponent', () => {
  let component: RatingScaleListComponent;
  let fixture: ComponentFixture<RatingScaleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingScaleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingScaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
