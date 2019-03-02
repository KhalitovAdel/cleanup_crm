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
  OfferControl: FormGroup;

  Offers: Array<Object> [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private svc: CalculateService,
    private myHttp: myHTTPService,) { }

  ngOnInit() {

    this.OfferControl = this.fb.group({
      leadLink: this.data.leadId,
      area: ['', Validators.required],
      regular: ['', Validators.required],
      time: '',
      details: this.fb.group({
        fot: ['', Validators.required],
        managerWage: ['', Validators.required],
        tinkoffCommission: ['', Validators.required],
        windowFond: ['', Validators.required],
        material: ['', Validators.required],
        profit: ['', Validators.required],
        itog: ['', Validators.required],
        itogMaterial: ['', Validators.required],
      })
    });

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