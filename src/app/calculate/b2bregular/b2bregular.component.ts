import { Component, OnInit } from '@angular/core';

import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-b2bregular',
  templateUrl: './b2bregular.component.html',
  styleUrls: ['./b2bregular.component.styl']
})
export class B2bregularComponent implements OnInit {
  firmname: String;
  address: String;
  area: Number;
  regularValue: Number;
  timeValue: Number;
  fot: Number;
  summ: String;
  tinkCom: Number;
  upr: Number;
  fond: Number;
  profit: Number;

  checked: null;

  regular: Object = {
    "Без выходных": 30,
    "5/2": 22,
    "2/2": 15,
    "3 раза в неделю": 13,
    "2 раза в неделю": 8.6,
    "Раз в неделю": 4.3,
    "Раз в месяц": 1
  };

  data = [
    { label: "Нужно мыть несколько раз?", id: "washTwoTime" },
    { label: "Нужна ли для них ночная смена", id: "nightWork" }
  ];

  constructor(
    private svc: CalculateService,
    private myHttp: myHTTPService
    ) {  }
    adel() {
      for (let key in this.regular) {
        if (this.regularValue == this.regular[key]) {
          return key;
        }
      }
    }
    doPDF() {
      console.log('doPDF');
      console.log(this.summ);
      return this.myHttp.postHTTP('/makePDF', {
        firmname: this.firmname,
        address: this.address,
        area: this.area,
        regularValue: this.adel(),
        itog: this.summ
      });
    }
    createLead() {
      return this.myHttp.postHTTP('/newLead', {name: this.area});
    }

  timeZeroing(value) {
    if (value === false) {
      return this.timeValue = NaN;
    }
  }

  onChange(item) {
    this.checked = item.checked;
    item.checked = !item.checked;
    this.timeZeroing(this.checked);
    return this.someCalculate();
  }
  someCalculate() {
    this.fot = this.svc.calculateFot(this.area, this.regularValue, this.timeValue);
    this.tinkCom = this.svc.calculateTinkoffCommission(this.area, this.regularValue, this.timeValue);
    this.upr = this.svc.calculateManagerWage();
    this.fond = this.svc.calculateWindowsFond(this.area);
    this.profit = this.svc.setProfit(this.area, this.timeValue);
    return this.summ = this.svc.calculateItog(this.area, this.regularValue, this.timeValue);
  }
  ngOnInit() {
  }

}
