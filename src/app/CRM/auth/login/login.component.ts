import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  User = {
  }
  constructor(
    private alert: AlertService,
    private _routes: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  register(){

  }

  login(){
    return this.auth.loginByEmployee(this.User)
      .subscribe( (data: any) => {
        localStorage.setItem('token', data.token);
        this._routes.navigate(['/newlead']);
      }, err => {
        this.alert.openSnackBar(err);
      })
  }

  

}
