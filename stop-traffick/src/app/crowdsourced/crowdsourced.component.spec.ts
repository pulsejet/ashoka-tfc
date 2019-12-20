import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdsourcedComponent } from './crowdsourced.component';

describe('CrowdsourcedComponent', () => {
  let component: CrowdsourcedComponent;
  let fixture: ComponentFixture<CrowdsourcedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdsourcedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdsourcedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
