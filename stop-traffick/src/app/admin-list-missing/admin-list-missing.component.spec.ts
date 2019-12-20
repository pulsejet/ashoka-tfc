import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListMissingComponent } from './admin-list-missing.component';

describe('AdminListMissingComponent', () => {
  let component: AdminListMissingComponent;
  let fixture: ComponentFixture<AdminListMissingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListMissingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
