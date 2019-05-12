import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {
  Profile = {
    Name: String,
    Surname: String,
    role: String
  };
  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<string[]>;

  position:boolean = false;
  screenWidth: number;

  constructor(
    private myHttp: myHTTPService,
    private cookieService: CookieService
  ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.Profile = JSON.parse(localStorage.getItem('UserBio'));
  }

  async getLeadList() {
    await this.myHttp.getHTTP('/crm/lead/getLeadList')
      .subscribe( (data: [])=> {
        this.options = data;
      }, err => {
        console.log('Get all Leads error: ' + err);
      });
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter( (option: any ) => option.details.firmName.toLowerCase().includes(filterValue));
  }
}
