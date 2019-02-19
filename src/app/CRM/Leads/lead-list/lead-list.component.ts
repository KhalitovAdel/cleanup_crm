import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.styl']
})
export class LeadListComponent implements OnInit {
  Leads: {};
  constructor(
    private myHttp: myHTTPService
  ) { }

  ngOnInit() {
    this.getLeadList();
  }
  // async getLeadList() {
  //   var data = await this.myHttp.getHTTP('/getLeadList');
  //   console.log(data);
  //   return this.Leads = data;
  // };
  async getLeadList() {
    console.log('Работаем');
    var data = await this.myHttp.getHTTP('http://localhost:3000/getLeadList');
    console.log(data);
    return this.Leads = data;
  }

}
