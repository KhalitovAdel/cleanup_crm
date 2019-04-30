import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
  newUser: FormGroup;
  constructor(
    private myHttp: myHTTPService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.newUser = this.fb.group({
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  invite() {
    this.myHttp.postHTTP('/configuration/invite', this.newUser.value)
      .subscribe(data=> {
        console.log(data)
      }, err=> {
        console.log(err)
      })
  }

}
