import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderhomeComponent } from './headerhome.component';

describe('HeaderhomeComponent', () => {
  let component: HeaderhomeComponent;
  let fixture: ComponentFixture<HeaderhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
