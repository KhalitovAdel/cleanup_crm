import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.styl']
})
export class EmployeesListComponent implements OnInit {
  AllEmployees: Array<object>;
  constructor(
    private myHttp: myHTTPService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.myHttp.getHTTP('/crm/users/getEmployeeList')
      .subscribe( (data: any) => {;
        this.AllEmployees = data;
        console.log(this.AllEmployees)
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      })
  }

  somefunc() {
    this.myHttp.getHTTP('/updateLead')
      .subscribe( (data: any) => {;
        this.AllEmployees = data;
        console.log(this.AllEmployees)
      }, ( err: any ) => {
        this.alert.openSnackBar( err );
      })
  }

}
