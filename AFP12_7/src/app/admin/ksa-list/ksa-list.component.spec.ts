import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KsaListComponent } from './ksa-list.component';

describe('KsaListComponent', () => {
  let component: KsaListComponent;
  let fixture: ComponentFixture<KsaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KsaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KsaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
