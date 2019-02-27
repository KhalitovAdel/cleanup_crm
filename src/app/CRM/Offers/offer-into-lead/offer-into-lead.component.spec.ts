import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferIntoLeadComponent } from './offer-into-lead.component';

describe('OfferIntoLeadComponent', () => {
  let component: OfferIntoLeadComponent;
  let fixture: ComponentFixture<OfferIntoLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferIntoLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferIntoLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
