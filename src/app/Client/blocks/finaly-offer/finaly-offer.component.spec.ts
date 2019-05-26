import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalyOfferComponent } from './finaly-offer.component';

describe('FinalyOfferComponent', () => {
  let component: FinalyOfferComponent;
  let fixture: ComponentFixture<FinalyOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalyOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalyOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
