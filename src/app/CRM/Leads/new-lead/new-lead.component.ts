import { Component, OnInit } from '@angular/core';

import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-new-lead',
  templateUrl: './new-lead.component.html',
  styleUrls: ['./new-lead.component.styl']
})
export class NewLeadComponent implements OnInit {

  Lead = {
    firmName: '',
    address: '',
    contactNumber: [],
    contactEmail: [],
    contactName: '',
    position: '',
    lprsName: '',
    parser2gis: ''
  };
  Deal = {
    area: Number,
    regularValue: Number,
    timeValue: Number
  };
  
  fot: Number;
  summ: String;
  tinkCom: Number;
  upr: Number;
  fond: Number;
  profit: Number;
  summMaterial: String;

  

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

  constructor(
    private svc: CalculateService,
    private myHttp: myHTTPService
    ) { }

    adel() {
      for (let key in this.regular) {
        if (this.Deal.regularValue == this.regular[key]) {
          return key;
        }
      }
    }
    async pars2gisplease() {
      var data = await this.myHttp.postHTTP('/pars2gis', {link: this.Lead.parser2gis});
      console.log(data);
      for (let x in data) {
		  if (data[x].indexOf('tel:') + 1 ) {
			data[x] = data[x].split(':')[1];
		  }
		  for (let y in this.Lead) {
			  if (x == y) {
				  this.Lead[y] = data[x];
			  }
		  }
      }
    }
    doPDF() {
      console.log('doPDF');
      console.log(this.summ);
      return this.myHttp.postHTTP('/makePDF', {
        firmname: this.Lead.firmName,
        address: this.Lead.address,
        area: this.Deal.area,
        regularValue: this.adel(),
        itog: this.summ,
        itogMaterial: this.summMaterial
      });
    }
    createLead() {
      return this.myHttp.postHTTP('/newLead', this.Lead);
    }

  onChange(item) {
    this.checked = item.checked;
    item.checked = !item.checked;
    return this.someCalculate();
  }
  someCalculate() {
    this.fot = this.svc.calculateFot(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
    this.tinkCom = this.svc.calculateTinkoffCommission(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
    this.upr = this.svc.calculateManagerWage();
    this.fond = this.svc.calculateWindowsFond(this.Deal.area);
    this.profit = this.svc.setProfit(this.Deal.area, this.Deal.timeValue);
    this.summMaterial = this.svc.calculateItogMaterial(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
    return this.summ = this.svc.calculateItog(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
  }

  ngOnInit() {
  }

}
