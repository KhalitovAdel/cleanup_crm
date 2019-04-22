import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployessPageComponent } from './employess-page.component';

describe('EmployessPageComponent', () => {
  let component: EmployessPageComponent;
  let fixture: ComponentFixture<EmployessPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployessPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
