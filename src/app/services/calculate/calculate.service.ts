import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

    ONE_HOUR_PRICE = 59;
    ONE_METER_PRICE = 0.455;
    ONE_DAY_PRICE = 227;
    MROT = 12000;

    getOfficialFot(area, regularValue, timeValue, twice):number {  
      if ( timeValue != '' && timeValue != null ) { // Считается по часам

        return this.MROT * ( timeValue * regularValue / (30/7) ) / 40;

      } else { //Считаем по квадратуре
        if (twice === true) {
          
          return this.MROT * ( ( area * 2 / 150 ) * regularValue / (30/7) ) / 40;

        }
        return this.MROT * ( ( area / 150 ) * regularValue / (30/7) ) / 40;
      }
    }

    getOfficialFotNalog(area, regularValue, timeValue, twice) {
      var offFot = this.getOfficialFot(area, regularValue, timeValue, twice);
      var itog = {
        NDFL: parseFloat( (offFot* 0.13).toFixed(2) ),
        PS: parseFloat( (offFot * 0.22).toFixed(2) ),
        MS: parseFloat( (offFot * 0.051).toFixed(2) ),
        Other: parseFloat( (offFot * 0.029).toFixed(2) ),
        Travm: parseFloat( (offFot * 0.002).toFixed(2) ),
        Summ: 1
      }
      var itogSumm = itog.NDFL + itog.PS + itog.MS + itog.Other + itog.Travm;
      itog.Summ = parseFloat( itogSumm.toFixed(2) );
      return itog;
    }

    calculateFot(area, regularValue, timeValue, twice) {
      if ( timeValue != '' && timeValue != null ) { // Считается по часам
        console.log('Считается по часам');
        return this.beautyPrice( regularValue * ( this.ONE_DAY_PRICE + timeValue * this.ONE_HOUR_PRICE ) );
      } else { //Считаем по квадратуре
        if (twice === true) {
          return this.beautyPrice( regularValue * ( this.ONE_DAY_PRICE + area * this.ONE_METER_PRICE * 2 ) + 2000 );
        }
        return this.beautyPrice( regularValue * ( this.ONE_DAY_PRICE + area * this.ONE_METER_PRICE ) );
      }
    }
    
    calculateBlackFot(area, regularValue, timeValue, twice) {
      return  this.calculateFot(area, regularValue, timeValue, twice)
              - this.getOfficialFot(area, regularValue, timeValue, twice) 
              + this.getOfficialFotNalog(area, regularValue, timeValue, twice).NDFL;
    }

    calculateManagerWage(area, regularValue)  {
      if ( area < 120 && regularValue < 9 ) {
        return 750;
      }
      return 500 + 750;
    }

    calculateWindowsFond(area)  {
      return 300;
    }

    calculateTinkoffCommission(area, regularValue, timeValue, twice)  {

      return this.beautyPrice( 
              ( this.calculateBlackFot(area, regularValue, timeValue, twice) 
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateWindowsFond(area) ) * 1.5 / 98.5);
    }

    beautyPrice(num): number  {
      Number.parseInt(num);
      return Math.ceil(num);
    }

    calculateMaterial(area, regularValue, twice)  {
      if (twice === true) {
        return this.beautyPrice( (4.08 * regularValue + regularValue * area * 0.09 * 2 + 718) );
      }
      return this.beautyPrice( (4.08 * regularValue + regularValue * area * 0.09 + 718) );
    }

    setProfit(area, regularValue, timeValue, twice)  {
      
      if ( isNaN(timeValue) && ( area <= 120 ) && (regularValue < 9) ) {
        return 1000;
      }
      if ( ( isNaN(timeValue) || timeValue === '' ) && ( area <= 120 ) && regularValue < 9) {
        return 1500;
      } 
      return 3000;
    }

    calculateItog(area, regularValue, timeValue, twice)  {

      return this.beautyPrice(
        (     this.getOfficialFot(area, regularValue, timeValue, twice)
              + this.calculateBlackFot(area, regularValue, timeValue, twice)
              + this.getOfficialFotNalog(area, regularValue, timeValue, twice).Summ
              - this.getOfficialFotNalog(area, regularValue, timeValue, twice).NDFL
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateTinkoffCommission(area, regularValue, timeValue, twice) 
              + this.calculateWindowsFond(area) 
              + this.setProfit(area, regularValue, timeValue, twice) ) * 100 / 94
      );
    }

    calculateItogMaterial(area, regularValue, timeValue, twice)  {

      return this.beautyPrice(
              ( this.getOfficialFot(area, regularValue, timeValue, twice)
              + this.calculateBlackFot(area, regularValue, timeValue, twice)
              + this.getOfficialFotNalog(area, regularValue, timeValue, twice).Summ
              - this.getOfficialFotNalog(area, regularValue, timeValue, twice).NDFL
              + this.calculateManagerWage(area, regularValue) 
              + this.calculateTinkoffCommission(area, regularValue, timeValue, twice) 
              + this.calculateWindowsFond(area) 
              + this.calculateMaterial(area, regularValue, twice)
              + this.setProfit(area, regularValue, timeValue, twice) ) * 100 / 94
      );
    }
    getCalculate(area, regularValue, timeValue, twice)  {
      var Offer: Object = {
        whiteFot: parseFloat( this.getOfficialFot(area, regularValue, timeValue, twice).toFixed(2) ),
        blackFot: parseFloat( this.calculateBlackFot(area, regularValue, timeValue, twice).toFixed(2) ),
        fotOnHand:  parseFloat( this.getOfficialFot(area, regularValue, timeValue, twice).toFixed(2) )
                    + parseFloat( this.calculateBlackFot(area, regularValue, timeValue, twice).toFixed(2) )
                    - this.getOfficialFotNalog(area, regularValue, timeValue, twice).NDFL,
        zpNalog: this.getOfficialFotNalog(area, regularValue, timeValue, twice),
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

    getChangesCalculate(Offer) {
      var rashodi: number = Number.parseInt(Offer.details.fot) 
                  + Number.parseInt(Offer.details.managerWage)
                  + Number.parseInt(Offer.details.windowFond);
      var tinkoff: number = rashodi * 1.5 / 98.5;
      var profit: number = Number.parseInt(Offer.details.profit),
          material: number = Number.parseInt(Offer.details.material);
      return {
        tinkoffCommission: this.beautyPrice(tinkoff),
        itog: this.beautyPrice( (rashodi + tinkoff + profit ) * 100 / 94 ),
        itogMaterial: this.beautyPrice( (rashodi + tinkoff + profit + material ) * 100 / 94 )
      }
    }
  constructor() { }
}
