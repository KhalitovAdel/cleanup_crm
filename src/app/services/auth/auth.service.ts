import { Injectable } from '@angular/core';
import { myHTTPService } from '../HTTP/myhttp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private myHttp: myHTTPService,
  ) { }

  registerNewEmployee(employee) {
    return this.myHttp.postHTTP( '/register', employee );
  }

  loginByEmployee(employee) {
    return this.myHttp.postHTTP('/login', employee);
  }
  
}
