import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtzoviComponent } from './otzovi.component';

describe('OtzoviComponent', () => {
  let component: OtzoviComponent;
  let fixture: ComponentFixture<OtzoviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtzoviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtzoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
