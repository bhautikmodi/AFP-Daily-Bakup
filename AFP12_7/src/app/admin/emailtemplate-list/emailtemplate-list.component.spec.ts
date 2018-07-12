import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplateListComponent } from './emailtemplate-list.component';

describe('EmailtemplateListComponent', () => {
  let component: EmailtemplateListComponent;
  let fixture: ComponentFixture<EmailtemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
