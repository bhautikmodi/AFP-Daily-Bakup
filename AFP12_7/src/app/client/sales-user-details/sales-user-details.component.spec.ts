import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUserDetailsComponent } from './sales-user-details.component';

describe('SalesUserDetailsComponent', () => {
  let component: SalesUserDetailsComponent;
  let fixture: ComponentFixture<SalesUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
