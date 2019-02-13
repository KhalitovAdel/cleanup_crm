import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bregularComponent } from './b2bregular.component';

describe('B2bregularComponent', () => {
  let component: B2bregularComponent;
  let fixture: ComponentFixture<B2bregularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bregularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bregularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
