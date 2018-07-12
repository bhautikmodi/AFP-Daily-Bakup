import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationlistComponent } from './invitationlist.component';

describe('InvitationlistComponent', () => {
  let component: InvitationlistComponent;
  let fixture: ComponentFixture<InvitationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
