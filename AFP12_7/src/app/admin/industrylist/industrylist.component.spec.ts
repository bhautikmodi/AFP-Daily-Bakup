import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrylistComponent } from './industrylist.component';

describe('IndustrylistComponent', () => {
  let component: IndustrylistComponent;
  let fixture: ComponentFixture<IndustrylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
