import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

interface UserTemplate {
  email: String,
  password: String
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  User: UserTemplate = {
    email: '',
    password: ''
  };
  constructor(
    private alert: AlertService,
    private _routes: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  login(){
    return this.auth.loginByEmployee(this.User)
      .subscribe( (data: any) => {
        localStorage.setItem('UserBio', JSON.stringify(data) );
        this._routes.navigate(['workspace/crm/leadlist']); 
      }, err => {
        this.alert.openSnackBar(err);
      })
  }

  

}
