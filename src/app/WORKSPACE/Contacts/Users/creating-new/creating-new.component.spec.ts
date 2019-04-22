import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingNewComponent } from './creating-new.component';

describe('CreatingNewComponent', () => {
  let component: CreatingNewComponent;
  let fixture: ComponentFixture<CreatingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
