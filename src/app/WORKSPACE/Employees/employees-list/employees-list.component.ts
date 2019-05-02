import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.styl']
})
export class EmployeesListComponent implements OnInit {
  AllEmployees: any;
  areasList: string[] = [
    'Вахитовский',
    'Авиастроительный',
    'Кировский',
    'Московский',
    'Ново-Савиновский',
    'Приволжский',
    'Советский',
    'Рассматривает вахтовый метод'
    ]
  EmplList: Array<object>;
  targetEmp: Array<string> = [];
  constructor(
    private myHttp: myHTTPService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.myHttp.getHTTP('/crm/users/getEmployeeList')
      .subscribe( (data: any) => {;
        this.AllEmployees = data;
        this.EmplList = data;
        console.log(this.AllEmployees)
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      })
  }

  neededEmpl() {
    this.EmplList = [];
    for (let q of this.targetEmp) {
      for (let w of this.AllEmployees) {
        for (let e of w.details.workAdresses) {
          if (q.indexOf( e ) != -1) {
            if ( !(this.EmplList.indexOf( w ) != -1) ) {
              this.EmplList.push(w);
            }
          }
        }
      }
    }
  }

  somefunc() {
    this.myHttp.getHTTP('/updateLead')
      .subscribe( (data: any) => {;
        this.AllEmployees = data;
        this.EmplList = data;
        console.log(this.AllEmployees)
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      })
  }

}
