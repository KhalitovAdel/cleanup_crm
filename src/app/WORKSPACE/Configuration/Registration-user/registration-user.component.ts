import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';


@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.styl']
})
export class RegistrationUserComponent implements OnInit {
  AllRoles = [
    'admin',
    'manager'
  ]
  constructor(
    private myHttp: myHTTPService
  ) {}

  ngOnInit() {

  }

}
