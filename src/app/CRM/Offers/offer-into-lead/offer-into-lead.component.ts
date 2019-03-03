import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-offer-into-lead',
  templateUrl: './offer-into-lead.component.html',
  styleUrls: ['./offer-into-lead.component.styl']
})
export class OfferIntoLeadComponent implements OnInit {

  changeIndicator: Number = -1;

  Offers: Array<any> = [
    {details: Object}
  ];

  RegularControl: Array<Object> = [
    {days: 30, translate: 'Без выходных'},
    {days: 25.8, translate: '6/1 - сб полный'},
    {days: 23.7, translate: '6/1 - сб не полный'},
    {days: 21.5, translate: '5/2'},
    {days: 15, translate: '2/2'},
    {days: 13, translate: '3 раза в неделю'},
    {days: 8.6, translate: '2 раза в неделю'},
    {days: 4.3, translate: 'Раз в неделю'},
    {days: 1, translate: 'Раз в месяц'}
  ];

  constructor(
    private bottomSheet: MatBottomSheet,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private svc: CalculateService,
    private myHttp: myHTTPService,
    private alert: AlertService,) { }

  ngOnInit() {
    this.getLeadOffers();
  }

  getLeadOffers() {
    this.myHttp.postHTTP('http://localhost:3000/getAllOffersFromLead', {leadLink: this.data.leadId})
      .subscribe( ( data: []) => {
        this.Offers = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  preChangeOffer(index) {
    if (index > -1) {
      return this.changeIndicator = index;
    }
    return this.changeIndicator = index;
  }
  calculate(index) {
    var offer: any = this.Offers[index];
    this.Offers[index].details = this.svc.getCalculate(
      offer.area, 
      offer.regular, 
      offer.time, 
      offer.twice);
  }

  saveOfferChanges(index) {
    this.changeIndicator = -1;
    this.myHttp.postHTTP('http://localhost:3000/saveOfferChanges', this.Offers[index])
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      });
  }

  openBottomSheet(i): void {
    this.bottomSheet.open(BottomSheet, {
      data: {offer: this.Offers[i]}
    });
  }

}


@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'some.html',
})
export class BottomSheet {
  changeIndicator: Boolean = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private myHttp: myHTTPService,
    private alert: AlertService,
    private svc: CalculateService,
    ) {}

    Offer = this.data.offer;

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  preChangeLead(e, boolean: Boolean) {
    e.preventDefault();
    if (boolean === true) {
      return this.changeIndicator = true;
    }
    return this.changeIndicator = false;
  }

  calculate() {
    var result = this.svc.getChangesCalculate(this.Offer);
    this.Offer.details.itog = result.itog;
    this.Offer.details.itogMaterial = result.itogMaterial;
    this.Offer.details.tinkoffCommission = result.tinkoffCommission;
  }

  saveOfferDetailChanges() {
    this.changeIndicator = false;
    this.myHttp.postHTTP('http://localhost:3000/saveOfferDetailChanges', {data: this.Offer})
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      });
  }
}