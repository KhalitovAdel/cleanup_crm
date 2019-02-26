import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

    ONE_HOUR_PRICE = 59;
    ONE_METER_PRICE = 0.455;
    ONE_DAY_PRICE = 227;

    calculateFot(area, regularValue, timeValue) {
      if ( timeValue != '' ) { // Считается по часам
        return this.beautyPrice( regularValue * ( this.ONE_DAY_PRICE + timeValue * this.ONE_HOUR_PRICE ) );
      }
      if ( timeValue == '' ) { //Считаем по квадратуре
        return this.beautyPrice( regularValue * ( this.ONE_DAY_PRICE + area * this.ONE_METER_PRICE ) );
      }
    }
    
    calculateManagerWage(area, regularValue) {
      if ( area < 120 && regularValue < 9 ) {
        return 750;
      }
      return 500 + 750;
    }

    calculateWindowsFond(area) {
      return 300;
    }

    calculateTinkoffCommission(area, regularValue, timeValue) {

      return this.beautyPrice( ( this.calculateFot(area, regularValue, timeValue) 
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateWindowsFond(area) ) * 1.5 / 98.5 );
    }

    beautyPrice(num) {
      return Math.ceil(num);
    }

    calculateMaterial(area, regularValue) {
      return this.beautyPrice( (4.08 * regularValue + regularValue * area * 0.09 + 718) );
    }

    setProfit(area, regularValue, timeValue) {
      
      if ( isNaN(timeValue) && ( area <= 120 ) && (regularValue < 9) ) {
        return 1000;
      }
      if ( isNaN(timeValue) && ( area <= 120 ) ) {
        return 1500;
      } 
      return 3000;
    }

    calculateItog(area, regularValue, timeValue) {

      return this.beautyPrice(
        ( this.calculateFot(area, regularValue, timeValue) 
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateTinkoffCommission(area, regularValue, timeValue) 
              + this.calculateWindowsFond(area) 
              + this.setProfit(area, regularValue, timeValue) ) * 100 / 94
      );
    }

    calculateItogMaterial(area, regularValue, timeValue) {

      return this.beautyPrice(
        ( this.calculateFot(area, regularValue, timeValue) 
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateTinkoffCommission(area, regularValue, timeValue) 
              + this.calculateWindowsFond(area) 
              + this.calculateMaterial(area, regularValue)
              + this.setProfit(area, regularValue, timeValue) ) * 100 / 94
      );
    }
    getCalculate(area, regularValue, timeValue) {
      var Offer: Object = {
        fot: this.calculateFot(area, regularValue, timeValue),
        managerWage: this.calculateManagerWage(area, regularValue),
        tinkoffCommission: this.calculateTinkoffCommission(area, regularValue, timeValue),
        windowFond: this.calculateWindowsFond(area),
        material: this.calculateMaterial(area, regularValue),
        profit: this.setProfit(area, regularValue, timeValue),
        itog: this.calculateItog(area, regularValue, timeValue),
        itogMaterial: this.calculateItogMaterial(area, regularValue, timeValue)
      }
      return Offer;
    }
  constructor() { }
}
