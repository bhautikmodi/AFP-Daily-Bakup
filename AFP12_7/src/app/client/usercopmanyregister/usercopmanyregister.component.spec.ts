import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercopmanyregisterComponent } from './usercopmanyregister.component';

describe('UsercopmanyregisterComponent', () => {
  let component: UsercopmanyregisterComponent;
  let fixture: ComponentFixture<UsercopmanyregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercopmanyregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercopmanyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
