import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeregisterComponent } from './welcomeregister.component';

describe('WelcomeregisterComponent', () => {
  let component: WelcomeregisterComponent;
  let fixture: ComponentFixture<WelcomeregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
