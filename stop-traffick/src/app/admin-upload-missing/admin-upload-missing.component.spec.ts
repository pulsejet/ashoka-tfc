import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadMissingComponent } from './admin-upload-missing.component';

describe('AdminUploadMissingComponent', () => {
  let component: AdminUploadMissingComponent;
  let fixture: ComponentFixture<AdminUploadMissingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUploadMissingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
