import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-employess-page',
  templateUrl: './employess-page.component.html',
  styleUrls: ['./employess-page.component.styl']
})
export class EmployessPageComponent implements OnInit {
  id: String; //Полученный id из url
  Employe: any = {
    details: {
      birthDate: new Date,
      contactPhone: [],
      fullName: String,
      homeAddress: String,
      workAdresses: [],
      workGrah: String,
      workHistory: String,
    }
  };
  constructor(
    private route: ActivatedRoute,
    private myHttp: myHTTPService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getEmploye();
  }

  getEmploye() {
    this.myHttp.postHTTP('/employess/getEmploye', { id: this.id})
      .subscribe(data=> {
        this.Employe = data;
      }, err => {
        console.log(err)
      })
  }

}
