import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { myHTTPService } from '../HTTP/myhttp.service';

@Injectable()

export class AuthGuard implements CanActivate {
  detect: boolean = false;
  constructor(
    private _router: Router,
    private cookieService: CookieService,
    private myHttp: myHTTPService
  ) {}

  canActivate(): boolean {
    this.myHttp.getHTTP('http://localhost:3000/detect')
      .subscribe( (data: any) => {
        if (data.detect === true) {
          this.detect = true;
        }
      }, err => {
        console.log(err);
      })
      if (this.detect === false) {
        this._router.navigate(['/login']);
      }
      return this.detect;
  }
}
