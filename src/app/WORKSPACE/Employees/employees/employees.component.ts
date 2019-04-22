import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.styl']
})
export class EmployeesComponent implements OnInit {

  EmployeeControl: FormGroup;
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
  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private myHttp: myHTTPService,
  ) { }

  ngOnInit() {
    this.EmployeeControl = this.fb.group({
      details: this.fb.group({
        fullName: ['', Validators.required],
        birthDate: ['', Validators.required],
        contactPhone: this.fb.array([
          ['', Validators.required]
        ]),
        homeAddress: ['', Validators.required],
        workAdresses: new FormControl(),
        workHistory: ['', Validators.required],
        workGrah: ['', Validators.required]
      }),
      creatingDate: new Date,
    });
  }

  saveEmployee(): void {
    if (this.EmployeeControl.valid) {
      this.myHttp.postHTTP('/crm/users/createNewEmployee', this.EmployeeControl.value)
        .subscribe( (data: any) => {
          this.alert.openSnackBar( data.message );
          this.EmployeeControl.reset();
        }, ( err: any ) => {
          this.alert.openSnackBar( err );
        })
    } else {
      this.alert.openSnackBar('🤦‍ Заполнены не все поля!');
    }
  }

}
