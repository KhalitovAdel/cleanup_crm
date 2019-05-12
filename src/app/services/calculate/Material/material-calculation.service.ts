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
    const data = this.myhttp.getHTTP('/crm/config/getMaterialList');
    return data;
  }

  async getCalculateInventory(Offer) {
    // var summMonth: number = 0;
    // var summToStart: number = 0;
    if (this.isEmpty(this.AllMaterial)) {
      this.AllMaterial = await this.getMaterialList();
    }

    for (let i in Offer.objects) {
      var persons: number = 0;
      var ItogMonth: number = 0;
      var ItogToStart: number = 0;

      for (let x in Offer.objects[i].employees) {
        persons = persons + Offer.objects[i].employees[x].count * ((Offer.objects[i].employees[x].workDayPerMonth == 15)?1/2:1);
      }
   
    Offer.objects[i].details['Inventory'] = []
    
      for (let y in this.AllMaterial) {
        if (this.AllMaterial[y].type == 'inventory') {
          var some: any = {};
          //some = {};
          some['id'] = this.AllMaterial[y]._id;
          some['count'] = Math.round(persons);
          some['Itog'] = Math.round(persons) * this.AllMaterial[y].price;
          some['ItogAmortization'] = some.Itog/this.AllMaterial[y].expluotation;
          Offer.objects[i].details.Inventory.push(some);
          ItogMonth = ItogMonth + some.ItogAmortization;
          ItogToStart = ItogToStart + some.Itog;
        }
      }
      Offer.objects[i].details['material'] = ItogMonth;
      Offer.objects[i].details['materialToStart'] = ItogToStart;
      // summMonth = summMonth + Offer.objects[i].details.material;
      // summToStart = summToStart + Offer.objects[i].details.materialToStart;
    }
    // Offer.details.material = summMonth;
    // Offer.details.materialToStart = summToStart;
    return Offer;
  }

  getCalculateInventoryToWindow(Offer) {
    return this.getCalculateInventory(Offer)
      .then(data => {
        // var summMonth: number = 0;
        // var summToStart: number = 0;
        for (let x in Offer.objects) {
          var ItogMonth: number = 0;
          var ItogToStart: number = 0;
          Offer.objects[x].details['WindowInventory'] = [];

          for (let y in this.AllMaterial) {
            if (this.AllMaterial[y].type == 'window') {
              var some: any = {}
              some['id'] = this.AllMaterial[y]._id;
              some['count'] = (Offer.objects[x].area < 1000)?1:Math.round(Offer.objects[x].area/1000);
              some['Itog'] = some.count * this.AllMaterial[y].price;
              some['ItogAmortization'] = some.Itog / this.AllMaterial[y].expluotation;
              Offer.objects[x].details.WindowInventory.push(some);
              ItogMonth = ItogMonth + some.ItogAmortization;
              ItogToStart = ItogToStart + some.Itog;
            }
          }
          Offer.objects[x].details.material = Offer.objects[x].details.material + ItogMonth;
          Offer.objects[x].details.materialToStart = Offer.objects[x].details.materialToStart + ItogToStart;
          // summMonth = summMonth + Offer.objects[x].details.material;
          // summToStart = summToStart + Offer.objects[x].details.materialToStart;
        }
        return Offer;
      })
      .catch(e => {
        console.log(e);
      });
        
  }

  getCalculateChemistry(Offer) {
    return this.getCalculateInventoryToWindow(Offer)
      .then(data => {
        var summMonth: number = 0;
        var sumToStart: number = 0;

        for (let x in Offer.objects) {
          var ItogMonth: number = 0;
          
          Offer.objects[x].details['Chemistry'] = [];
        
          for (let y in this.AllMaterial) {
            if (this.AllMaterial[y].type == 'chemistry') {
              var some: any = {}
              some['id'] = this.AllMaterial[y]._id;
              some['count'] = Offer.objects[x].regular * (this.AllMaterial[y].norms * Offer.objects[x].area/this.AllMaterial[y].area) / this.AllMaterial[y].volume;
              some['Itog'] = some.count * this.AllMaterial[y].price
              Offer.objects[x].details.Chemistry.push(some);
              ItogMonth = ItogMonth + some.Itog;
            }
          }
          
          Offer.objects[x].details.material= Math.round(Offer.objects[x].details.material + ItogMonth);
          Offer.objects[x].details.materialToStart = Math.round(Offer.objects[x].details.materialToStart + ItogMonth);
          summMonth = summMonth + Offer.objects[x].details.material;
          sumToStart = sumToStart + Offer.objects[x].details.materialToStart;
        }
        Offer.details['material'] = summMonth;
        Offer.details['materialToStart'] = sumToStart;
        return Offer;
      })
      .catch(e => {
        console.log(e);
      });
  }
}
