import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdsourceComponent } from './crowdsource.component';

describe('CrowdsourceComponent', () => {
  let component: CrowdsourceComponent;
  let fixture: ComponentFixture<CrowdsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
