import { Component, OnInit } from '@angular/core';
import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.styl']
})
export class CalcComponent implements OnInit {

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
  OfferControl: FormGroup;
  
  canCalculate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private svc: CalculateService,
  ) { }

  ngOnInit() {
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
    this.OfferControl.valueChanges
      .subscribe(
        (value) => console.log(value)
      );
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
    this.OfferControl.reset();
    this.OfferControl['controls'].objects['controls'].length = 1;
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
}
