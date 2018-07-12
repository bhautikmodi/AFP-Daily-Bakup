import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDashboardComponent } from './sales-dashboard.component';

describe('SalesDashboardComponent', () => {
  let component: SalesDashboardComponent;
  let fixture: ComponentFixture<SalesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
