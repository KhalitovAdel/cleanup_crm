import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-lead-page',
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.styl']
})
export class LeadPageComponent implements OnInit {
  id: String; //Полученный id из url
  private sub: any;
  Lead = {
    _id: '',
    firmName: '',
    address: '',
    contactNumber: [],
    contactEmail: [],
    contactName: '',
    position: '',
    lprsName: '',
    parser2gis: ''
  };

  constructor(
    private route: ActivatedRoute,
    private myHttp: myHTTPService,
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getLeadInfo();
    });
  }

  ngOnInit() {
  }
  async getLeadInfo() {
    var data = await this.myHttp.postHTTP('http://localhost:3000/getLeadInfo', {_id: this.id} );
    for (let x in data) {
		  for (let y in this.Lead) {
			  if (x == y) {
				  this.Lead[y] = data[x];
			  }
		  }
    }
  }
  setUpdeteToLead() {
    return this.myHttp.putHTTP('/updateLead', this.Lead);
  }

}
