import { Injectable } from '@angular/core';
import { CalculateService } from '../calculate.service';
import { myHTTPService } from '../../HTTP/myhttp.service';

export var METER_PER_HOURE: number = 135;

@Injectable({
  providedIn: 'root'
})
export class MaterialCalculationService {
  AllMaterial: any;

  constructor(
    private myhttp: myHTTPService,
    ) { }

  isEmpty(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

  beautyPrice(num): number  {
    return parseFloat((num).toFixed(2));
  }

  getMaterialList() {
    const data = this.myhttp.getHTTP('/getMaterialList').toPromise();
    return data;
  }

  async getCalculateInventory(Offer, details) {
    var persons: number = 0;
    var ItogMonth: number = 0;
    var ItogToStart: number = 0;
    for (let i in Offer.objects) {
      for (let x in Offer.objects[i].employees) {
        persons = persons + Offer.objects[i].employees[x].count * ((Offer.objects[i].employees[x].workDayPerMonth == 15)?1/2:1);
      }
    }
   
    details['Inventory'] = []
    if (this.isEmpty(this.AllMaterial)) {
      this.AllMaterial = await this.getMaterialList();
    }
  for (let y in this.AllMaterial) {
    if (this.AllMaterial[y].type == 'inventory') {
      var some: any = {};
      //some = {};
      some['id'] = this.AllMaterial[y]._id;
      some['count'] = Math.round(persons);
      some['Itog'] = Math.round(persons) * this.AllMaterial[y].price;
      some['ItogAmortization'] = some.Itog/this.AllMaterial[y].expluotation;
      details.Inventory.push(some);
      ItogMonth = ItogMonth + some.ItogAmortization;
      ItogToStart = ItogToStart + some.Itog;
    }
  }
    details['material'] = ItogMonth;
    details['materialToStart'] = ItogToStart;
    return details;
  }

  getCalculateInventoryToWindow(Offer, details) {
    return this.getCalculateInventory(Offer, details)
      .then(data => {
        var SummArea:number = 0;
        var ItogMonth: number = 0;
        var ItogToStart: number = 0;
        data['WindowInventory'] = [];
        for (let y in Offer.objects) {
          SummArea = SummArea + Offer.objects[y].area;
        }
        for (let y in this.AllMaterial) {
          if (this.AllMaterial[y].type == 'window') {
            var some: any = {}
            some['id'] = this.AllMaterial[y]._id;
            some['count'] = (SummArea < 1000)?1:Math.round(SummArea/1000);
            some['Itog'] = some.count * this.AllMaterial[y].price;
            some['ItogAmortization'] = some.Itog / this.AllMaterial[y].expluotation;
            data.WindowInventory.push(some);
            ItogMonth = ItogMonth + some.ItogAmortization;
            ItogToStart = ItogToStart + some.Itog;
          }
        }
        data.material= data.material + ItogMonth;
        data.materialToStart = data.materialToStart + ItogToStart;
        
        return data;
      })
        
  }

  getCalculateChemistry(Offer, details) {
    return this.getCalculateInventoryToWindow(Offer, details)
      .then(data => {
        var SummArea:number = 0;
        var ItogMonth: number = 0;
        var Value: number = 0;
        data['Chemistry'] = [];
        for (let y in Offer.objects) {
          SummArea = SummArea + Offer.objects[y].area*Offer.objects[y].regular;
        }
        for (let y in this.AllMaterial) {
          if (this.AllMaterial[y].type == 'chemistry') {
            var some: any = {}
            some['id'] = this.AllMaterial[y]._id;
            some['count'] = (this.AllMaterial[y].norms * SummArea/this.AllMaterial[y].area) / this.AllMaterial[y].volume;
            some['Itog'] = some.count * this.AllMaterial[y].price
            data.Chemistry.push(some);
            ItogMonth = ItogMonth + some.Itog;
          }
        }
        
        data.material= Math.round(data.material + ItogMonth);
        data.materialToStart = Math.round(data.materialToStart + ItogMonth);
        return data;
      })
  }
}
