import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfBoardComponent } from './conf-board.component';

describe('ConfBoardComponent', () => {
  let component: ConfBoardComponent;
  let fixture: ComponentFixture<ConfBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
