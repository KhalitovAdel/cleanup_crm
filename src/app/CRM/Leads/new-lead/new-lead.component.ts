import { Component, OnInit } from '@angular/core';

import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { Guid } from "guid-typescript";
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Offer, OfferInterface } from 'interfacess/OfferInterface';
import { MaterialCalculationService } from 'src/app/services/calculate/Material/material-calculation.service';


@Component({
  selector: 'app-new-lead',
  templateUrl: './new-lead.component.html',
  styleUrls: ['./new-lead.component.styl'],
})
export class NewLeadComponent implements OnInit {

  LeadControl: FormGroup;
  OfferControl: FormGroup;
  
  canCalculate: boolean = false;

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
    {status: 'DoesntReqFurtherWork', translate: 'Не требует дальнейшей работы'},
  ];

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private svc: CalculateService,
    private myHttp: myHTTPService,
    private material: MaterialCalculationService
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
      objects: this.fb.array([
        this.addObject()
      ]),
      details: this.createDetails(),
      status: '',
      createdDate: new Date,
      sentingDate: '',
    });

    // this.LeadControl.valueChanges
    //   .subscribe(
    //     // (value) => console.log(value)
    //   );

    // this.OfferControl.valueChanges
    //   .subscribe(
    //     // (value) => console.log(value)
    //   );
      
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
  addObject():FormGroup {
    return this.fb.group({
      area: ['', Validators.required],
      regular: ['', Validators.required],
      time: '',
      twice: false,
      employees: this.fb.array([
  
      ]),
    })
  }
  createDetails() {
    return this.fb.group({
      Chemistry: Array,
      Inventory: Array,
      WindowInventory: Array,
      employeesCount: Number,
      managerWage: Number,
      windowFond: Number,
      obnalCommission: Number,
      profit: Number,
      material: Number,
      itog: Number,
      base_nalog_itog: Number,
      itogMaterial: Number,
      base_nalog_itog_material: Number,
      discount: Number,
      materialToStart: Number
    })
  }
  getValue() {
    console.log(this.OfferControl.value);
  }
  createNewEmployeesGroup() {
    return this.fb.group({
      count: Number,
      metersPerDay: Number,
      timeToWorkPerDay: Number,
      workDayPerMonth: Number,
      fotOnHand: Number,
      whiteFot: Number,
      blackFot: Number,
      zpNalog: Object
    })
  }
  createNewObject() {
    ( this.OfferControl.get('objects') as FormArray ).push( this.addObject() );
  }
  //methods to control contactPhone inputs

  calculate() {
    var schetchik = 0;
    for(let z in this.OfferControl['controls'].objects['controls']) {
      var object = this.OfferControl['controls'].objects['controls'][z].value;
      if (object.area > 0 && object.regular > 0) {
        if (this.canCalculate === false) {
          schetchik = 1;
          this.canCalculate = true;
        }
      } else {
        this.valid(this.OfferControl);
      }
    }
    for (let i in this.OfferControl['controls'].objects['controls']) {
      while (this.OfferControl['controls'].objects['controls'][i]['controls'].employees.length !== 0) {
        this.OfferControl['controls'].objects['controls'][i]['controls'].employees.removeAt(0)
      }
    }
    if (schetchik === 1) {
      this.svc.getCalculate(
        this.OfferControl.value
      ).then(data=> {
        for (let y in data.objects) {
          for (let i in data.objects[y].employees) {
            (this.OfferControl['controls'].objects['controls'][y]['controls'].employees['controls'] as FormArray).push(this.createNewEmployeesGroup())
          }
        }
        this.OfferControl.patchValue(data);
        this.canCalculate = false;
        console.log(this.OfferControl.value)
      }) 
    } 
  }

  pars2gis() {
    return this.myHttp.postHTTP('/pars2gis', 
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

  resetForm() {
    this.LeadControl.reset();
    this.OfferControl.reset();
  }

  createNewLead() {
    this.valid(this.LeadControl);
    if (this.LeadControl.valid) {
      var data = this.clearLead(this.LeadControl);
      return this.myHttp.postHTTP('/newLead', data)
        .subscribe( (data: any) => {
          this.alert.openSnackBar( data.message );
        }, ( err: any ) => {
          this.alert.openSnackBar( err );
        }
      );
      //Добавить отчистку объекта
    } else {
      this.alert.openSnackBar('🤦‍ Заполнены не все поля!');
    }
  }//createNewLead
  
  createNewLeadOffer() {
    this.valid(this.LeadControl);
    this.valid(this.OfferControl);
    if ( this.LeadControl.valid && this.OfferControl.valid ) {
      var data = this.clearLead(this.LeadControl);
      this.OfferControl.get('status').setValue('created');
      return this.myHttp.postHTTP('/newLeadOffer', {Lead: data, Offer: this.OfferControl.value})
        .subscribe( (data: any) => {
          this.alert.openSnackBar( data.message );
        }, ( err: any ) => {
          this.alert.openSnackBar( err );
        }
    )
    } else {
      this.alert.openSnackBar('🤦‍ Заполнены не все поля!');
    }
  }
  createNewLeadOfferSend() {
    this.LeadControl.get('contactEmail').setValidators([Validators.required]);
    this.LeadControl.get('contactEmail').updateValueAndValidity();
    this.valid(this.LeadControl);
    this.valid(this.OfferControl);
    if ( this.LeadControl.valid && this.OfferControl.valid ) {
      var data = this.clearLead(this.LeadControl);
      this.OfferControl.get('status').setValue('sent');
      this.OfferControl.get('sentingDate').setValue(new Date);
      return this.myHttp.postHTTP('/newLeadOfferSend', {Lead: data, Offer: this.OfferControl.value})
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      }
    )
    } else {
      this.alert.openSnackBar('🤦‍ Заполнены не все поля!');
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
  
}