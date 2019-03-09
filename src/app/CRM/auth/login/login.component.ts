import { Component, OnInit } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  User = {
  }
  constructor(
    private myHttp: myHTTPService,
    private alert: AlertService,
    private _routes: Router
  ) { }

  ngOnInit() {
  }

  register(){
    console.log(this.User);
    return this.myHttp.postHTTP('http://localhost:3000/register', this.User)
      .subscribe( (data: any) => {
        console.log( data );
        localStorage.setItem('token', data.token);
        this._routes.navigate(['/newlead']);
      }, ( err: any ) => {
        console.log( err );
      })
  }

  login(){
    return this.myHttp.postHTTP('http://localhost:3000/login', this.User)
      .subscribe( (data: any) => {
        console.log( data );
        localStorage.setItem('token', data.token);
        this._routes.navigate(['/newlead']);
      }, ( err: any ) => {
        console.log( err );
      })
  }

}
