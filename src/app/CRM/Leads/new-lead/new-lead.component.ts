import { Component, OnInit } from '@angular/core';

import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { Guid } from "guid-typescript";
//import { DatePipe } from '@angular/common';
import { Lead } from 'interfacess';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-lead',
  templateUrl: './new-lead.component.html',
  styleUrls: ['./new-lead.component.styl'],
  //providers: [DatePipe]
})
export class NewLeadComponent implements OnInit {

  LeadControl: FormGroup;
  OfferControl: FormGroup;
  Result: Object = {
    fot: Number,
    itog: Number,
    itogMaterial: Number,
    managerWage: Number,
    material: Number,
    profit: Number,
    tinkoffCommission: Number,
    windowFond: Number,
  };

  RegularControl: Array<Object> = [
    {days: '30', translate: 'Без выходных'},
    {days: '25.8', translate: '6/1 - сб полный'},
    {days: '23.7', translate: '6/1 - сб не полный'},
    {days: '21.5', translate: '5/2'},
    {days: '15', translate: '2/2'},
    {days: '13', translate: '3 раза в неделю'},
    {days: '8.6', translate: '2 раза в неделю'},
    {days: '4.3', translate: 'Раз в неделю'},
    {days: '1', translate: 'Раз в месяц'}
  ];
  
  PanelControl: Array<Object> = [
    {action: 'call', translate: 'Звонок'},
    {action: 'meet', translate: 'Встреча'},
    {action: 'task', translate: 'Задача'},
  ];

  LeadStatus: Array<Object> = [
    {status: 'identifyLPR', translate: 'Выявление ЛПР'},
    {status: 'attemptCommunicateLPR', translate: 'Попытка связаться с ЛПР'},
    {status: 'identifyNeed', translate: 'Выявление потребности у ЛПР'},
    {status: 'offerSended', translate: 'Отправленно КП'},
  ];

  constructor(
    private fb: FormBuilder,
    private svc: CalculateService,
    private myHttp: myHTTPService,
    ) {}

  ngOnInit() {

    this.LeadControl = this.fb.group({
      leadId: Guid.create().toString(),
      leadStatus: ['', Validators.required],
      firmName: ['', Validators.required],
      contactPhones: this.fb.array([ ['', Validators.required] ]),
      contactName: '',
      position: '',
      contactEmail: ['', Validators.email],
      address: ['', Validators.required],
      lprsName: '',
      comments: this.fb.array([
        this.fb.group({
          description: '',
          createdDate: new Date
        })
      ]),
      tasks: this.fb.array([
        this.fb.group({
          status: 'started',
          action: ['', Validators.required],
          description: ['', Validators.required],
          createdDate: new Date,
          deadLineDate: ['', Validators.required]
        })
      ]),
      link2gis: '',
      createdDate: new Date
    });

    this.OfferControl = this.fb.group({
      leadLink: this.LeadControl.get('leadId').value,
      area: ['', Validators.required],
      regular: ['', Validators.required],
      time: '',
      status: '',
      createdDate: new Date,
      sentingDate: '',
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

    this.LeadControl.valueChanges
      .subscribe(
        (value) => console.log(value)
      );

    this.OfferControl.valueChanges
      .subscribe(
        (value) => console.log(value)
      );
  } //ngOnInit finished

  //methods to control contactPhone inputs
  removeContactPhoneControl(index) {
    if (( this.LeadControl.controls['contactPhones'] as FormArray ).length > 1 ) {
      ( this.LeadControl.controls['contactPhones'] as FormArray ).removeAt(index);
    }
  }
  addContactPhoneControl(e) {
    e.preventDefault();
    ( this.LeadControl.get('contactPhones') as FormArray ).push(new FormControl);
  }
  //methods to control contactPhone inputs
  calculate() {
    if ( this.OfferControl.get('area').value > 0 && this.OfferControl.get('regular').value > 0 ) {

      this.OfferControl.get('details').setValue( this.svc.getCalculate(
        this.OfferControl.get('area').value, 
        this.OfferControl.get('regular').value,
        this.OfferControl.get('time').value,
      ));
      this.Result = this.OfferControl.get('details').value;
      return this.Result;

    }
  }
  //https://material.angular.io/components/snack-bar/examples 
  validator(formGroup: FormGroup) {
    formGroup.reset();
    Object.values(formGroup.controls).forEach( (control: any) => {
      control.markAsTouched();
      console.log(control);
      if (control.controls) {
          control.controls.forEach(c => this.validator(c));
      }
    });
  }
  pars2gis() {
    return this.myHttp.postHTTP('http://localhost:3000/pars2gis', 
                        {link: this.LeadControl.get('link2gis').value})
      .subscribe(data =>  {
        for (let x in this.LeadControl.value ) {
          for (let y in data) {
            if (x === y) {
              if (x == 'contactPhones') {
                console.log(data[y].length);
                (this.LeadControl.get(x) as FormArray ).removeAt(0);
                for (var i = 0; i < data[y].length; i++) {
                  (this.LeadControl.get(x) as FormArray ).push(new FormControl(data[y][i]) );
                }
              } else {
                this.LeadControl.get(x).setValue( data[y] );
              }
            }
          }
        }
        console.log(data);
      }, err => {
        console.log(err);
      }
      );
  }//pars2gis

  createNewLead() {
    this.LeadControl.valid
    if (this.LeadControl.valid) {
      var data = this.clearLead(this.LeadControl);
      return this.myHttp.postHTTP('http://localhost:3000/newLead', data)
        .subscribe(data => {
          console.log(data);//Реализовать красивый ответ
        }, err => {
          console.log(err);
        }
      );
      //Добавить отчистку объекта
    } else {
      this.LeadControl.invalid;
    }
  }//createNewLead
  
  createNewLeadOffer() {
    if ( this.LeadControl.valid && this.OfferControl.valid ) {
      var data = this.clearLead(this.LeadControl);
      this.OfferControl.get('status').setValue('created');
      return this.myHttp.postHTTP('http://localhost:3000/newLeadOffer', {Lead: data, Offer: this.OfferControl.value})
      .subscribe(data => {
        console.log(data);//Реализовать красивый ответ
      }, err => {
        console.log(err);
      }
    )
    }
  }
  createNewLeadOfferSend() {
    if ( this.LeadControl.valid && this.OfferControl.valid ) {
      var data = this.clearLead(this.LeadControl);
      this.OfferControl.get('status').setValue('sent');
      this.OfferControl.get('sentingDate').setValue(new Date);
      return this.myHttp.postHTTP('http://localhost:3000/newLeadOfferSend', {Lead: data, Offer: this.OfferControl.value})
      .subscribe(data => {
        console.log(data);//Реализовать красивый ответ
      }, err => {
        console.log(err);
      }
    )
    }
  }
  clearLead(group: FormGroup) {
    var copeLead: Object = group.value;
    Object.keys(copeLead).forEach(key => {
      if (typeof(copeLead[key]) === 'string' && 
      (copeLead[key] === null || copeLead[key] === '') ) {
        delete copeLead[key];
      } else if ( Array.isArray(copeLead[key]) ) {
        for (var x of copeLead[key]) {
          if (x instanceof Object) {
            for (let y in x) {
              if ( x[y] === null || x[y] === '') {
                copeLead[key] = [];
              }
            }
          }
        }
      }
    });
    return copeLead;
  } 
}
