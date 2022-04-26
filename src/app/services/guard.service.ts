import { Injectable } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  /*controllo(url: string): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    return false;
  }
  canActivate(state: RouterStateSnapshot, next: ActivatedRouteSnapshot) {
    let url: string = state.url;
    return this.controllo(url);
  }*/


  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      alert ('Devi eseguire l\' accesso!');
      return false;
    }
    return true;
  }

}
