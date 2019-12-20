import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRoutesComponent } from './track-routes.component';

describe('TrackRoutesComponent', () => {
  let component: TrackRoutesComponent;
  let fixture: ComponentFixture<TrackRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
