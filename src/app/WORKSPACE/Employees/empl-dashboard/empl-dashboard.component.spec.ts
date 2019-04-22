import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplDashboardComponent } from './empl-dashboard.component';

describe('EmplDashboardComponent', () => {
  let component: EmplDashboardComponent;
  let fixture: ComponentFixture<EmplDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
