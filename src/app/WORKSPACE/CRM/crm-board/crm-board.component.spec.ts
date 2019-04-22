import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBoardComponent } from './crm-board.component';

describe('CrmBoardComponent', () => {
  let component: CrmBoardComponent;
  let fixture: ComponentFixture<CrmBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
