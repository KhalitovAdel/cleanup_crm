import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstaffComponent } from './outstaff.component';

describe('OutstaffComponent', () => {
  let component: OutstaffComponent;
  let fixture: ComponentFixture<OutstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
