import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { Offer } from 'interfacess/OfferInterface';
import { CalculateService } from 'src/app/services/calculate/calculate.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.styl']
})
export class OffersListComponent implements OnInit {
  AllOffers: any;
  constructor(
    private myHttp: myHTTPService,
    private svc: CalculateService,
  ) { }

  ngOnInit() {
    this.getOfferList();
  }

  getOfferList() {
    this.myHttp.getHTTP('/crm/offer/getAllOffers')
      .subscribe( (data)=> {
        this.AllOffers = data;
        console.log(this.AllOffers);
      }, err => {
        console.log('Get all Leads error: ' + err);
      });
  }
  newDetails(index) {
    // index.details = this.svc.getChangeCalculate(
    //   index.area,
    //   index.regular,
    //   index.time,
    //   index.twice,
    //   index.details.itog
    // ) ;
  }
  async changeAllDetails() {
    for (let i of this.AllOffers) {
      this.newDetails(i);
    }
    this.myHttp.postHTTP('/changeOfferDetailsToAll', this.AllOffers)
      .subscribe(data=> {
        console.log('Успешно!')
      }, err=>{
        console.log(err);
      })
  }

}
