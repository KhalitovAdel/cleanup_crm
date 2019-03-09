import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private authService: AuthService 
  ) {}

  canActivate(): boolean {
    if ( this.authService.loggedId() ) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
