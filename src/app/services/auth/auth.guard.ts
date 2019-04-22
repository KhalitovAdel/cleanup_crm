import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { myHTTPService } from '../HTTP/myhttp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';


@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private cookieService: CookieService,
    private myHttp: myHTTPService
  ) {}

  canActivate():Observable<boolean>|boolean {
    return this.myHttp.getHTTP('/crm/config/detect')
      .pipe(map( (data: any) => {
        if (data.detect === true) {
          return true;
        }
      }),
      catchError( (err: HttpErrorResponse) => {
        this._router.navigate(['/crm/login']);
        return Observable.throw(err.statusText);
      })
    )}
}
