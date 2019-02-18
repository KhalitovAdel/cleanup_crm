import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-lead-page',
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.styl']
})
export class LeadPageComponent implements OnInit {
  id: any;
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
    private share: ShareService
  ) {
    this.share.onChange.subscribe(cnt => this.Lead._id = cnt);
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getLeadInfo();
    });
  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['id']; // (+) converts string 'id' to a number
    //   this.getLeadInfo();
    // });
  }
  async getLeadInfo() {
    var data = await this.myHttp.postHTTP('/getLeadInfo', {_id: this.id} );
    for (let x in data) {
		  for (let y in this.Lead) {
			  if (x == y) {
				  this.Lead[y] = data[x];
			  }
		  }
    }
    return this.share.shareVarible(this.Lead._id);
  }
  setUpdeteToLead() {
    return this.myHttp.putHTTP('/updateLead', this.Lead);
  }

}
