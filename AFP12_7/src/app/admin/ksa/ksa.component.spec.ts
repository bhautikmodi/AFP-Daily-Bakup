import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KsaComponent } from './ksa.component';

describe('KsaComponent', () => {
  let component: KsaComponent;
  let fixture: ComponentFixture<KsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
