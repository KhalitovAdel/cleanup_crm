import { Injectable } from '@angular/core';
import { METER_PER_HOURE, MaterialCalculationService } from './Material/material-calculation.service';
interface Objects {
  area: number,
  regular: number,
  time: number,
  twice: boolean
}
@Injectable({
  providedIn: 'root'
})
export class CalculateService {

    ONE_HOUR_PRICE: number = 59;
    ONE_METER_PRICE: number = 0.455;//0.68
    ONE_DAY_PRICE: number = 277;//340
    MROT: number = 12000;
    
  constructor(private material: MaterialCalculationService) { }

  beautyPrice(num): number  {
    return parseFloat((num).toFixed(2));
  }
  
  getWorkersCounte(object): object {

    var coefficient: number = (object.regular==30)?2:1; //Коэф кол-ва людей, если график без выходных в 2 раза больше людей
    var timeToWork: number = object.time?object.time:12; // Время на объекте

    var counte: number = object.area / METER_PER_HOURE / timeToWork; // Кол-ва людей в определенном графике
    if ( ( counte - Math.trunc(counte) ) / Math.trunc(counte) > 0.15 && ( counte >= 1) ) {
      var metersperone = object.area/counte;
      return [
          {
            count: this.beautyPrice( Math.trunc(counte) * coefficient ),
            metersPerDay: this.beautyPrice( object.area/counte ),
            timeToWorkPerDay: this.beautyPrice( metersperone/METER_PER_HOURE ),
            workDayPerMonth: this.beautyPrice( object.regular/coefficient )
        },
        {
          count: this.beautyPrice( 1 * coefficient ),
          metersPerDay: this.beautyPrice( metersperone * ( counte - Math.trunc(counte) ) ),
          timeToWorkPerDay: this.beautyPrice( metersperone * ( counte - Math.trunc(counte) )/METER_PER_HOURE ),
          workDayPerMonth: this.beautyPrice( object.regular/coefficient )
        }
      ]
    } else {
      return [{
        count: this.beautyPrice( ( (Math.trunc(counte)<1)?1:Math.trunc(counte) ) * coefficient ),
        metersPerDay: this.beautyPrice( object.area/( (counte<1)?1:counte) ),
        timeToWorkPerDay: this.beautyPrice( object.area/( (counte<1)?1:counte)/METER_PER_HOURE ),
        workDayPerMonth: this.beautyPrice( object.regular/coefficient)
      }]
    }
  }
  calculateFot(object):object {
    var counteResult = this.getWorkersCounte(object)
    for (let i in counteResult) {
      if (object.twice === false) {
        counteResult[i]['fotOnHand'] = this.beautyPrice( counteResult[i].workDayPerMonth * (this.ONE_DAY_PRICE + counteResult[i].metersPerDay * this.ONE_METER_PRICE) );
      } else {
        counteResult[i]['fotOnHand'] = this.beautyPrice( 1.5 * counteResult[i].workDayPerMonth * (this.ONE_DAY_PRICE + counteResult[i].metersPerDay * this.ONE_METER_PRICE) );
      }
    }
    return counteResult;
  }

  getOfficialFot(object):object {
    var calculateFotResult = this.calculateFot(object);
    for (let i in calculateFotResult) {

      var potentialOfficialFot = this.beautyPrice( calculateFotResult[i].workDayPerMonth * calculateFotResult[i].timeToWorkPerDay / 2 * ( (this.MROT /(30/7) )/40 ) );
      calculateFotResult[i]['whiteFot'] = (potentialOfficialFot> 6000)?6000:potentialOfficialFot;
    }
    return calculateFotResult;
  }

  getOfficialFotNalog(object):object {
    var officialFotResult = this.getOfficialFot(object);
    for (let i in officialFotResult) {
      var offFot = officialFotResult[i].whiteFot;
      officialFotResult[i]['zpNalog'] = {
          NDFL: this.beautyPrice(offFot* 0.13),
          PS: this.beautyPrice(offFot * 0.22),
          MS: this.beautyPrice(offFot * 0.051),
          Other: this.beautyPrice(offFot * 0.029),
          Travm: this.beautyPrice(offFot * 0.002),
          Summ: 1
        }
        var itogSumm =    officialFotResult[i]['zpNalog'].NDFL 
                          + officialFotResult[i]['zpNalog'].PS 
                          + officialFotResult[i]['zpNalog'].MS 
                          + officialFotResult[i]['zpNalog'].Other 
                          + officialFotResult[i]['zpNalog'].Travm;
        officialFotResult[i]['zpNalog'].Summ = this.beautyPrice( itogSumm );
    }
    return officialFotResult;
  }

  calculateBlackFot(object):object {
    var calculateNalogResult = this.getOfficialFotNalog(object);
    for (let i in calculateNalogResult) {
      calculateNalogResult[i]['blackFot'] = this.beautyPrice(calculateNalogResult[i]['fotOnHand'] - calculateNalogResult[i]['whiteFot']);
    }
    return calculateNalogResult;
  }

  calculatEmployeesCount(Offer) {
    var summ: number = 0;
    for (let i in Offer.objects) {
      var counte = 0;
      for (let x in Offer.objects[i].employees) {
        counte = counte + Offer.objects[i].employees[x].count;
      }
      Offer.objects[i]['details'] = {};
      Offer.objects[i].details['employeesCount'] = counte;
      summ = summ + counte;
    }
    Offer.details.employeesCount = summ;
    return Offer;
  }

  calculateManagerWage(Offer)  {
    var data = this.calculatEmployeesCount(Offer);
    var summ: number = 0;
    for (let i in data.objects) {
      data.objects[i].details['managerWage'] = ( 500 + 750 * data.objects[i].details.employeesCount );//*2.4
      summ = summ + data.objects[i].details.managerWage;
    }
    data.details.managerWage = summ;
    return data;
  }

  calculateWindowsFond(Offer)  {
    var summ: number = 0;
    var data = this.calculateManagerWage(Offer);
    for (let i in Offer.objects) {
      data.objects[i].details['windowFond'] = this.beautyPrice( 450 * ((Offer.objects[i]['area']/300 < 1)?1:(Offer.objects[i]['area']/400) ) )
      summ = summ + data.objects[i].details.windowFond;
    }
    data.details.windowFond = summ;
    return data;
  }

  calculateTinkoffCommission(Offer)  {
    var summ: number = 0;
    var data = this.calculateWindowsFond(Offer);
    for (let i in Offer.objects) {
      var rash = 0;
      for (let x in Offer.objects[i].employees) {
        rash = rash + Offer.objects[i].employees[x].blackFot * Offer.objects[i].employees[x].count;
      }
      data.objects[i].details['obnalCommission'] =  this.beautyPrice( (rash 
                                                    + data.objects[i].details.managerWage
                                                    + data.objects[i].details.windowFond) * 1.5/98.5 + 100 );
      summ = summ + data.objects[i].details.obnalCommission;
    }
    data.details.obnalCommission = summ;
    return data;
  }

  setProfit(Offer)  {
    var data = this.calculateTinkoffCommission(Offer);
    var summ: number = 0;
    for (let i in Offer.objects) {
      if (data.objects[i].details.employeesCount > 10) {
        data.objects[i].details['profit'] = data.objects[i].details.employeesCount * 2000;
      } else {
        data.objects[i].details['profit'] = data.objects[i].details.employeesCount * 4000;
      }
      summ = summ + data.objects[i].details.profit;
    }
    data.details.profit = summ;
    return data;
  }

  async calculateMaterial(Offer)  {
    var data = this.setProfit(Offer);
    return await this.material.getCalculateChemistry(Offer);
    return data;
  }

  calculateItog(Offer) {
    return this.calculateMaterial(Offer)
      .then(data=> {
        var itog: number = 0,
            base_nalog_itog: number = 0,
            discount: number = 0,
            itogMaterial: number = 0,
            base_nalog_itog_material: number = 0;

        for (let i in data.objects) {
          var Summ = 0;
          var obj = data.objects[i];
          for (let x in obj.employees) {
            Summ =  Summ + obj.employees[x].count * ( obj.employees[x].fotOnHand + obj.employees[x].zpNalog.Summ)          
          }
          
          obj.details['itog'] = this.beautyPrice(( Summ + obj.details.managerWage
                          + obj.details.windowFond
                          + obj.details.obnalCommission
                          + obj.details.profit ) * 100/94 );
          obj.details['base_nalog_itog'] = this.beautyPrice(obj.details.itog*6/100);  
                                             
          obj.details['discount'] = 0;// Math.round(0.1 * obj.details.itog / 1.1);

          obj.details['itogMaterial'] = this.beautyPrice(( Summ + obj.details.managerWage
                                  + obj.details.windowFond
                                  + obj.details.obnalCommission
                                  + obj.details.profit
                                  + obj.details.material) *100/94 );
          
          obj.details['base_nalog_itog_material'] = this.beautyPrice(obj.details.itogMaterial*6/100);
          itog = itog + obj.details.itog
          base_nalog_itog = base_nalog_itog + obj.details.base_nalog_itog
          discount = discount + obj.details.discount
          itogMaterial = itogMaterial + obj.details.itogMaterial
          base_nalog_itog_material = base_nalog_itog_material + obj.details.base_nalog_itog_material
        }
        if (data.details.fullObj != true) {
          data.details.fullObj = false;
        }
        data.details.itog = itog;
        data.details.base_nalog_itog = base_nalog_itog;
        data.details.discount = discount;
        data.details.itogMaterial = itogMaterial;
        data.details.base_nalog_itog_material = base_nalog_itog_material;
        return data;
      })
  }
 
  async getCalculate(Offer) {
    var NewOffer = Offer;
    for (let i in NewOffer.objects) {
      NewOffer.objects[i].employees = this.calculateBlackFot(NewOffer.objects[i]);
    }
    await this.calculateItog(NewOffer);
    return NewOffer;
  }
}
