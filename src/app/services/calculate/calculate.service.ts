import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

    ONE_HOUR_PRICE = 59;
    ONE_METER_PRICE = 0.455;
    ONE_DAY_PRICE = 227;

    calculateFot(area, regularValue, timeValue, twice) {
      if ( timeValue != '' ) { // Считается по часам
        return this.beautyPrice( regularValue * ( this.ONE_DAY_PRICE + timeValue * this.ONE_HOUR_PRICE ) );
      }
      if ( timeValue == '' ) { //Считаем по квадратуре
        if (twice === true) {
          return this.beautyPrice( regularValue * ( this.ONE_DAY_PRICE + area * this.ONE_METER_PRICE * 2 ) + 2000 );
        }
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

    calculateTinkoffCommission(area, regularValue, timeValue, twice) {

      return this.beautyPrice( ( this.calculateFot(area, regularValue, timeValue, twice) 
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateWindowsFond(area) ) * 1.5 / 98.5 );
    }

    beautyPrice(num) {
      return Math.ceil(num);
    }

    calculateMaterial(area, regularValue, twice) {
      if (twice === true) {
        return this.beautyPrice( (4.08 * regularValue + regularValue * area * 0.09 * 2 + 718) );
      }
      return this.beautyPrice( (4.08 * regularValue + regularValue * area * 0.09 + 718) );
    }

    setProfit(area, regularValue, timeValue, twice) {
      
      if ( isNaN(timeValue) && ( area <= 120 ) && (regularValue < 9) ) {
        return 1000;
      }
      if ( ( isNaN(timeValue) || timeValue === '' ) && ( area <= 120 ) && regularValue < 9) {
        return 1500;
      } 
      return 3000;
    }

    calculateItog(area, regularValue, timeValue, twice) {

      return this.beautyPrice(
        ( this.calculateFot(area, regularValue, timeValue, twice) 
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateTinkoffCommission(area, regularValue, timeValue, twice) 
              + this.calculateWindowsFond(area) 
              + this.setProfit(area, regularValue, timeValue, twice) ) * 100 / 94
      );
    }

    calculateItogMaterial(area, regularValue, timeValue, twice) {

      return this.beautyPrice(
        ( this.calculateFot(area, regularValue, timeValue, twice) 
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateTinkoffCommission(area, regularValue, timeValue, twice) 
              + this.calculateWindowsFond(area) 
              + this.calculateMaterial(area, regularValue, twice)
              + this.setProfit(area, regularValue, timeValue, twice) ) * 100 / 94
      );
    }
    getCalculate(area, regularValue, timeValue, twice) {
      var Offer: Object = {
        fot: this.calculateFot(area, regularValue, timeValue, twice),
        managerWage: this.calculateManagerWage(area, regularValue),
        tinkoffCommission: this.calculateTinkoffCommission(area, regularValue, timeValue, twice),
        windowFond: this.calculateWindowsFond(area),
        material: this.calculateMaterial(area, regularValue, twice),
        profit: this.setProfit(area, regularValue, timeValue, twice),
        itog: this.calculateItog(area, regularValue, timeValue, twice),
        itogMaterial: this.calculateItogMaterial(area, regularValue, timeValue, twice)
      }
      return Offer;
    }
  constructor() { }
}
