import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outstaff',
  templateUrl: './outstaff.component.html',
  styleUrls: ['./outstaff.component.styl']
})
export class OutstaffComponent implements OnInit {
  ZP: number;
  ITOG: number;
  BlackFot = {
    ObnalComission: 1,
    ITOG: 1,
    Raznicya: 1
  }
  WhiteBlackFot = {
    NalogiPoTK: 1,
    white: 1,
    black: 1,
    ObnalComission: 1,
    ITOG: 1,
    Raznicya: 1
  }
  WhiteFot = {
    NalogiPoTK: 1,
    ITOG: 1,
    Raznicya: 1
  }
  constructor() { }

  ngOnInit() {
  }
  
  calculate() {
    this.ITOG = parseFloat((this.ZP * 100/94 + 3000 + 450).toFixed(0))
    this.calculateBlackFot();
    this.calculateWhiteBlackFot();
    this.calculateWhiteFot();
  }
  calculateBlackFot() {
    this.BlackFot.ObnalComission = parseFloat((this.ZP * 15 / 85).toFixed(0));
    this.BlackFot.ITOG = parseFloat((this.BlackFot.ObnalComission + this.ZP).toFixed(0));
    this.BlackFot.Raznicya = parseFloat((this.BlackFot.ITOG - this.ITOG).toFixed(0));
  }

  calculateWhiteBlackFot() {
    this.WhiteBlackFot.white = parseFloat( ((this.ZP>12000)?8000:this.ZP*0.6).toFixed(0));
    this.WhiteBlackFot.NalogiPoTK = parseFloat((this.WhiteBlackFot.white * (
                                              0.13
                                              + 0.22
                                              + 0.051
                                              + 0.029
                                              + 0.002  
                                              )).toFixed(0));
    this.WhiteBlackFot.black = parseFloat((this.ZP - this.WhiteBlackFot.white).toFixed(0));
    this.WhiteBlackFot.ObnalComission = parseFloat((this.WhiteBlackFot.black * 15/85).toFixed(0));
    this.WhiteBlackFot.ITOG =   parseFloat((this.WhiteBlackFot.white
                                + this.WhiteBlackFot.NalogiPoTK
                                + this.WhiteBlackFot.black
                                + this.WhiteBlackFot.ObnalComission ).toFixed(0));    
    this.WhiteBlackFot.Raznicya = parseFloat((this.WhiteBlackFot.ITOG - this.ITOG).toFixed(0));
  }
  calculateWhiteFot() {
    this.WhiteFot.NalogiPoTK = parseFloat((this.ZP * (
                                              0.13
                                              + 0.22
                                              + 0.051
                                              + 0.029
                                              + 0.002 
    )).toFixed(0));
    this.WhiteFot.ITOG = parseFloat((this.WhiteFot.NalogiPoTK + this.ZP).toFixed(0));
    this.WhiteFot.Raznicya = parseFloat((this.WhiteFot.ITOG - this.ITOG).toFixed(0));
  }

}
