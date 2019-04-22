import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {
  
  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<string[]>;

  position:boolean = false;
  screenWidth: number;

  constructor(
    private myHttp: myHTTPService
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
  }

  async getLeadList() {
    await this.myHttp.getHTTP('/getLeadList')
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
