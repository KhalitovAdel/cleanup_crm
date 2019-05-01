import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';

interface calculateResult {
  whiteFot: Number,
  blackFot: Number,
  fotOnHand: Number,
  zpNalog: Object,
  itog: Number,
  itogMaterial: Number,
  managerWage: Number,
  material: Number,
  profit: Number,
  tinkoffCommission: Number,
  windowFond: Number,
}

@Component({
  selector: 'app-offer-into-lead',
  templateUrl: './offer-into-lead.component.html',
  styleUrls: ['./offer-into-lead.component.styl']
})
export class OfferIntoLeadComponent implements OnInit {

  changeIndicator: Number = -1;

  OfferControl: FormGroup;

  Offers: Array<any> = [];

  Result: calculateResult = {
    whiteFot: 0,
    blackFot: 0,
    fotOnHand: 0,
    zpNalog: Object,
    itog: 0,
    itogMaterial: 0,
    managerWage: 0,
    material: 0,
    profit: 0,
    tinkoffCommission: 0,
    windowFond: 0,
  };

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private svc: CalculateService,
    private myHttp: myHTTPService,
    private alert: AlertService,
    private fb: FormBuilder,) { }

  ngOnInit() {
    this.getLeadOffers();

    this.OfferControl = this.fb.group({
      leadLink: this.data.leadId,
      area: ['', Validators.required],
      regular: ['', Validators.required],
      time: '',
      twice: false,
      status: '',
      createdDate: new Date,
      sentingDate: '',
      details: this.fb.group({
        whiteFot: Number,
        blackFot: Number,
        fotOnHand: Number,
        zpNalog: Object,
        itog: Number,
        itogMaterial: Number,
        managerWage: Number,
        material: Number,
        profit: Number,
        tinkoffCommission: Number,
        windowFond: Number,
      })
    });
  }

  newCalculate() {
    // console.log( this.svc.getWorkersCounte(
    //   this.OfferControl.get('area').value, 
    //   this.OfferControl.get('regular').value,
    //   this.OfferControl.get('time').value,
    //   this.OfferControl.get('twice').value,
    // ) );
    // if ( this.OfferControl.get('area').value > 0 && this.OfferControl.get('regular').value > 0 ) {

    //   this.OfferControl.get('details').setValue( this.svc.getCalculate(
    //     this.OfferControl.get('area').value, 
    //     this.OfferControl.get('regular').value,
    //     this.OfferControl.get('time').value,
    //     this.OfferControl.get('twice').value,
    //   ));
    //   this.Result = this.OfferControl.get('details').value;
    //   return this.getLeadOffers();

    // }
  }

  createNewOffer() {
    this.valid(this.OfferControl);
    if ( this.OfferControl.valid ) {
      this.OfferControl.get('status').setValue('created');
      console.log(this.OfferControl.value)
      return this.myHttp.postHTTP('/crm/offer/new', this.OfferControl.value)
        .subscribe( (data: any) => {
          this.alert.openSnackBar( data.message );
          this.getLeadOffers();
        }, ( err: any ) => {
          this.alert.openSnackBar( err );
        }
    )
    } else {
      this.alert.openSnackBar('🤦‍ Заполнены не все поля!');
    }
  }

  deleteOffer(index) {
    console.log(this.Offers[index]);
    return this.myHttp.postHTTP('/crm/offer/delete', this.Offers[index])
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
        this.getLeadOffers();
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      });
  };

  valid(group: FormGroup) {
    var copeLead: Object = group.controls;
    Object.keys(copeLead).forEach(key => {
      if (copeLead[key] instanceof FormControl) {
        copeLead[key].markAsTouched();
      } else {
        for (var x of copeLead[key].controls) {
            x.markAsTouched();
            for (let y in x.controls) {
              x.controls[y].markAsTouched();
            }
        }
      }
    });
  };

  getLeadOffers() {
    this.myHttp.postHTTP('/crm/lead/getAllOffersFromLead', {leadLink: this.data.leadId})
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
    // this.Offers[index].details = this.svc.getCalculate(
    //   offer.area, 
    //   offer.regular, 
    //   offer.time, 
    //   offer.twice);
  }

  saveOfferChanges(index) {
    this.changeIndicator = -1;
    this.myHttp.postHTTP('/crm/offer/change', this.Offers[index])
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

  sentOffer(index) {
    this.Offers[index].status = 'sent';
    this.myHttp.postHTTP('/crm/offer/send', this.Offers[index])
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
        this.getLeadOffers();
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
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
    // var result = this.svc.getChangesCalculate(this.Offer);
  }

  saveOfferDetailChanges() {
    this.changeIndicator = false;
    this.myHttp.postHTTP('/crm/offer/changeDetails', {data: this.Offer})
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      });
  }
}