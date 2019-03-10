import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(): boolean {
    if ( this.cookieService.check('connect.sid') ) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
