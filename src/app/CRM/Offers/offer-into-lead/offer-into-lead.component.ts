import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-offer-into-lead',
  templateUrl: './offer-into-lead.component.html',
  styleUrls: ['./offer-into-lead.component.styl']
})
export class OfferIntoLeadComponent implements OnInit {
  OfferControl: FormGroup;

  Offers: Array<Object> [];

  constructor(
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

}
