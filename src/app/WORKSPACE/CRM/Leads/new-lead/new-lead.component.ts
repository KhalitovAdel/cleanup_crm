import { Component, OnInit } from '@angular/core';

import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { Guid } from "guid-typescript";
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';


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
    private myHttp: myHTTPService
    ) {}

  ngOnInit() {
    this.LeadControl = this.fb.group({
      details: this.fb.group({
        leadId: Guid.create().toString(),
        leadStatus: ['', Validators.required],
        firmName: ['', Validators.required],
        contactPhones: this.fb.array([ ['', Validators.required] ]),
        contactName: '',
        position: '',
        contactEmail: ['', Validators.email],
        address: ['', Validators.required],
        lprsName: '',
        link2gis: '',
      }),
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
      leadId: '',
      createdDate: ''
    });

    this.OfferControl = this.fb.group({
      leadLink: '',
      objects: this.fb.array([
        this.addObject()
      ]),
      details: this.fb.group({
        fullObj: false, //Дает нам понять что этот объект состоит из нескольких помещений, то есть совокупность объектов считать по сумме всех итогов
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
        materialToStart: Number,
        accountantWage: Number,
        holidaysWage: Number,
        NZ: Number,
        thirteenthWage: Number
      }),
      status: '',
      sentingDate: '',
      createdDate: ''
    });

    // this.LeadControl.valueChanges
    //   .subscribe(
    //     // (value) => console.log(value)
    //   );

    this.OfferControl.valueChanges
      .subscribe(
        (value) => console.log(value)
      );
      
  } //ngOnInit finished

  //methods to control contactPhone inputs
  addContactPhoneControl(e) {
    e.preventDefault();
    ( this.LeadControl['controls'].details['controls'].contactPhones['controls'] as FormArray ).push(new FormControl);
  }

  removeContactPhoneControl(index) {
    if (( this.LeadControl['controls'].details['controls'].contactPhones as FormArray ).length > 1 ) {
      ( this.LeadControl['controls'].details['controls'].contactPhones as FormArray ).removeAt(index);
    }
  }
  addObject():FormGroup {
    return this.fb.group({
      area: ['', Validators.required],
      regular: ['', Validators.required],
      time: '',
      twice: false,
      details: this.createDetails(),
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
      materialToStart: Number,
      accountantWage: Number,
      holidaysWage: Number,
      NZ: Number,
      thirteenthWage: Number
    })
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
      zpNalog: Object,
      thirteenthWage: Number
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
      }) 
    } 
  }

  resetForm() {
    this.LeadControl.reset();
    this.OfferControl.reset();
  }

  createNewLead() {
    this.valid(this.LeadControl);
    if (this.LeadControl.valid) {
      this.preparatGroup();
      var data = this.LeadControl.value;
      return this.myHttp.postHTTP('/crm/lead/new', data)
        .subscribe( (data: any) => {
          this.alert.openSnackBar( data.message );
          this.resetAllControls();
        }, ( err: any ) => {
          this.alert.openSnackBar( err );
        }
      );
    } else {
      this.alert.openSnackBar('🤦‍ Заполнены не все поля!');
    }
  }//createNewLead
  
  createNewLeadOffer() {
    this.valid(this.LeadControl);
    this.valid(this.OfferControl);
    if ( this.LeadControl.valid && this.OfferControl.valid ) {
      this.preparatGroup();
      var data = this.LeadControl.value;
      this.OfferControl.get('status').setValue('created');
      return this.myHttp.postHTTP('/crm/lead/newLeadOffer', {Lead: data, Offer: this.OfferControl.value})
        .subscribe( (data: any) => {
          this.alert.openSnackBar( data.message );
          this.resetAllControls();
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
      this.preparatGroup();
      var data = this.LeadControl;
      this.OfferControl.get('status').setValue('sent');
      this.OfferControl.get('sentingDate').setValue(new Date);
      return this.myHttp.postHTTP('/crm/lead/newLeadOfferSend', {Lead: data, Offer: this.OfferControl.value})
      .subscribe( (data: any) => {
        this.alert.openSnackBar( data.message );
        this.resetAllControls();
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      }
    )
    } else {
      this.alert.openSnackBar('🤦‍ Заполнены не все поля!');
    }
  }
    
  preparatGroup(): void {
    this.LeadControl.get('createdDate').setValue(new Date);
    this.OfferControl.get('createdDate').setValue(new Date);
    this.LeadControl.get('leadId').setValue( Guid.create().toString() );
    this.OfferControl.get('leadLink').setValue( this.LeadControl['controls'].leadId.value );
  }//Создание уникального идентификатора и дату создания

  resetAllControls() {
    this.LeadControl.reset();
    this.OfferControl.reset();
    console.log(this.LeadControl.value)
    console.log(this.OfferControl.value)
  }

  valid(group: FormGroup) { // Проверить действующие контролы
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
  };//Переделать
  createTestKP() {
    this.myHttp.postHTTP('/crm/lead/createTestKP', {
      Lead: {
        firmName: 'TestFirm',
        address: 'Kazan'
      }, 
      Offer: this.OfferControl.value
    })
    .subscribe( (data: any) => {
      this.alert.openSnackBar( data.message );
      this.resetAllControls();
    }, ( err: any ) => {
      this.alert.openSnackBar( err );
    })
  }
}