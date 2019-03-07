import { Component } from '@angular/core';
import { myHTTPService } from './services/HTTP/myhttp.service';
import { AlertService } from './services/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'cleanupCRM';

  email: String = 'a@a.ru';
  password: String = '123';

  constructor (
    private myHttp: myHTTPService,
    private alert: AlertService,
  ) {}

  register(){
    return this.myHttp.postHTTP('http://localhost:3000/register', {email: this.email, password: this.password})
      .subscribe( (data: any) => {
        console.log( data );
      }, ( err: any ) => {
        console.log( err );
      })
  }

  login(){
    return this.myHttp.postHTTP('http://localhost:3000/login', {email: this.email, password: this.password})
      .subscribe( (data: any) => {
        console.log( data );
      }, ( err: any ) => {
        console.log( err );
      })
  }
}
