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
    ONE_METER_PRICE: number = 0.455;
    ONE_DAY_PRICE: number = 227;
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

  calculatEmployeesCount(Offer): object {
    var counte = 0;
    for (let i in Offer.objects) {
      for (let x in Offer.objects[i].employees) {
        counte = counte + Offer.objects[i].employees[x].count;
      }
    }
    return {employeesCount: counte};
  }

  calculateManagerWage(Offer): object  {
    var EmployeesCountResult = this.calculatEmployeesCount(Offer);
    EmployeesCountResult['managerWage'] = 500 + 750 * EmployeesCountResult['employeesCount']
    return EmployeesCountResult;
  }

  calculateWindowsFond(Offer): object  {
    var area = 0;
    var ManagerWageResult = this.calculateManagerWage(Offer);
    for (let i in Offer.objects) {
      area = area + Offer.objects[i]['area'];
    }
    ManagerWageResult['windowFond'] = this.beautyPrice( 300 * ((area/300 < 1)?1:(area/400) ) );
    return ManagerWageResult;
  }

  calculateTinkoffCommission(Offer): object  {
    var rash = 0;
    var WindowsFondResult = this.calculateWindowsFond(Offer);
    for (let i in Offer.objects) {
      for (let x in Offer.objects[i].employees) {
        rash = rash + Offer.objects[i].employees[x].blackFot * Offer.objects[i].employees[x].count;
      }
    }
    WindowsFondResult['obnalCommission'] = this.beautyPrice( (rash + WindowsFondResult['managerWage'] + WindowsFondResult['windowFond'])*15/85 );
    return WindowsFondResult;
  }

  setProfit(Offer): object  {
    var TinkoffCommissionResult = this.calculateTinkoffCommission(Offer);
    if (TinkoffCommissionResult['employeesCount'] > 10) {
      TinkoffCommissionResult['profit'] = TinkoffCommissionResult['employeesCount'] * 2000;
    } else {
      TinkoffCommissionResult['profit'] = TinkoffCommissionResult['employeesCount'] * 3000;
    }
    return TinkoffCommissionResult;
  }

  async calculateMaterial(Offer)  {
    var ProfitResult = this.setProfit(Offer);
    return await this.material.getCalculateChemistry(Offer ,ProfitResult);
  }

  calculateItog(Offer) {
    return this.calculateMaterial(Offer)
      .then(data=> {
        var Summ = 0;
        for (let i in Offer.objects) {
          for (let x in Offer.objects[i].employees) {
            Summ =  Summ + Offer.objects[i].employees[x].count * ( Offer.objects[i].employees[x].fotOnHand + Offer.objects[i].employees[x].zpNalog.Summ)
                    
          }
        }
        var potentialItog = this.beautyPrice(( Summ + data.managerWage
          + data.windowFond
          + data.obnalCommission
          + data.profit ) );
        var nalogItog = (data.profit/10 > potentialItog/99)?data.profit/10:potentialItog/99;
        
        data['itog'] = this.beautyPrice(( Summ + data.managerWage
                        + data.windowFond
                        + data.obnalCommission
                        + data.profit
                        + nalogItog )*1.1 );
        data['base_nalog_itog'] = this.beautyPrice(nalogItog);                                     
        data['discount'] = Math.round(0.1 * data.itog / 1.1);
        var potentialItogMaterial = this.beautyPrice(( Summ + data.managerWage
                          + data.windowFond
                          + data.obnalCommission
                          + data.profit 
                          + data.material) );
        var nalogItogMaterial = (data.profit/10 > potentialItogMaterial/99)?data.profit/10:potentialItogMaterial/99;
        
        data['itogMaterial'] = this.beautyPrice(( Summ + data.managerWage
                                + data.windowFond
                                + data.obnalCommission
                                + data.profit 
                                + data.material
                                + nalogItogMaterial) + data.discount );
        
        data['base_nalog_itog_material'] = this.beautyPrice(nalogItogMaterial);
        return data;
      })
  }
 
  async getCalculate(Offer) {
    var NewOffer = Offer;
    for (let i in NewOffer.objects) {
      NewOffer.objects[i].employees = this.calculateBlackFot(NewOffer.objects[i]);
    }
    NewOffer.details = await this.calculateItog(NewOffer);
    return NewOffer;
  }
}
