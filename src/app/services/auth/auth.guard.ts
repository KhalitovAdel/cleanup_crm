import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router
  ) {}

  canActivate(): boolean {
    if ( !!localStorage.getItem('token') ) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
