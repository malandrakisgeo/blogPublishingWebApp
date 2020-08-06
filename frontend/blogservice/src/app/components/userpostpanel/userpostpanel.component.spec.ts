import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpostpanelComponent } from './userpostpanel.component';

describe('UserpostpanelComponent', () => {
  let component: UserpostpanelComponent;
  let fixture: ComponentFixture<UserpostpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpostpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpostpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
