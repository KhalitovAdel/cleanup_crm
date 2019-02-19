import { Component, OnInit } from '@angular/core';

import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { DatePipe } from '@angular/common';
import { Lead } from 'interfacess';

@Component({
  selector: 'app-new-lead',
  templateUrl: './new-lead.component.html',
  styleUrls: ['./new-lead.component.styl'],
  providers: [DatePipe]
})
export class NewLeadComponent implements OnInit {
  Lead: Lead = {
    _id: '',
    firmName: '',
    address: '',
    contactPhones: [''],
    contactEmail: '',
    contactName: '',
    position: '',
    comments: [{description: String, createdDate: Date}],
    tasks: [],
    lprsName: '',
    parser2gis: '',
    createdDate: new Date
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
    private myHttp: myHTTPService,
    private datePipe: DatePipe
    ) {
     }
  // Реализованно конечно не очень
  setNewInput(e) {
    e.preventDefault();
    var target = e.currentTarget,
    container = target.parentElement.className.split(' ');
    for (let n in container) {
      for (let x in this.Lead) {  
        if (container[n] == x) {
          this.Lead[x].push('');
        }
      }
    }
  }
  // Реализованно конечно не очень
    adel() {
      for (let key in this.regular) {
        if (this.Deal.regularValue == this.regular[key]) {
          return key;
        }
      }
    }
    // Реализованно конечно не очень
    async pars2gisplease() {
      var data = await this.myHttp.postHTTP('http://localhost:3000/pars2gis', {link: this.Lead.parser2gis});
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
      return this.myHttp.postHTTP('http://localhost:3000/makePDF', {
        firmname: this.Lead.firmName,
        address: this.Lead.address,
        area: this.Deal.area,
        regularValue: this.adel(),
        itog: this.summ,
        itogMaterial: this.summMaterial,
        email: this.Lead.contactEmail
      });
    }
    createLead() {
      console.log(this.Lead);
      //this.Lead.createdDate = this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss.SSS'Z'");
      return this.myHttp.postHTTP('http://localhost:3000/newLead', this.Lead);
    }

  onChange(item) {
    this.checked = item.checked;
    item.checked = !item.checked;
    return this.someCalculate();
  }
  someCalculate() {
    this.fot = this.svc.calculateFot(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
    this.tinkCom = this.svc.calculateTinkoffCommission(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
    this.upr = this.svc.calculateManagerWage(this.Deal.area, this.Deal.regularValue);
    this.fond = this.svc.calculateWindowsFond(this.Deal.area);
    this.profit = this.svc.setProfit(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
    this.summMaterial = this.svc.calculateItogMaterial(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
    return this.summ = this.svc.calculateItog(this.Deal.area, this.Deal.regularValue, this.Deal.timeValue);
  }

  ngOnInit() {
    
  }

}
