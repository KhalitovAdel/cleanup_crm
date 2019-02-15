import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

    ONE_HOUR_PRICE = 59;
    ONE_METER_PRICE = 0.455;
    ONE_DAY_PRICE = 227;

    calculateFot(area, regularValue, timeValue) {
      if ( !isNaN(timeValue) ) { // Считается по часам
        return Math.ceil( regularValue * ( this.ONE_DAY_PRICE + timeValue * this.ONE_HOUR_PRICE ) );
      }
      if ( isNaN(timeValue) ) { 
        return Math.ceil( regularValue * ( this.ONE_DAY_PRICE + area * this.ONE_METER_PRICE ) );
      }
    }
    
    calculateManagerWage() {
      return 500 + 750;
    }

    calculateWindowsFond(area) {
      return 300;
    }

    calculateTinkoffCommission(area, regularValue, timeValue) {

      return Math.ceil( ( this.calculateFot(area, regularValue, timeValue) 
              + this.calculateManagerWage() 
              + this.calculateWindowsFond(area) ) * 1.5 / 98.5 );
    }

    beautyPrice(num) {
      return Math.ceil(num).toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + " ₽";
    }

    calculateMaterial(area, regularValue) {
      return 4.08 * regularValue + regularValue * area * 0.09 + 718;
    }

    setProfit(area, timeValue) {
      if ( isNaN(timeValue) && ( area <= 120 ) ) {
        return 1500;
      }
      if ( timeValue <= 2 ) {
        return 2000;
      }
      return 3000;
    }

    calculateItog(area, regularValue, timeValue) {

      if ( isNaN(area) && isNaN(regularValue) ) {
        return this.beautyPrice(0);
      }

      return this.beautyPrice(
        ( this.calculateFot(area, regularValue, timeValue) 
              + this.calculateManagerWage() 
              + this.calculateTinkoffCommission(area, regularValue, timeValue) 
              + this.calculateWindowsFond(area) 
              + this.setProfit(area, timeValue) ) * 100 / 94
      );
    }

    calculateItogMaterial(area, regularValue, timeValue) {

      if ( isNaN(area) && isNaN(regularValue) ) {
        return this.beautyPrice(0);
      }

      return this.beautyPrice(
        ( this.calculateFot(area, regularValue, timeValue) 
              + this.calculateManagerWage() 
              + this.calculateTinkoffCommission(area, regularValue, timeValue) 
              + this.calculateWindowsFond(area) 
              + this.calculateMaterial(area, regularValue)
              + this.setProfit(area, timeValue) ) * 100 / 94
      );
    }
  constructor() { }
}
