import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../services/account.service';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {

  constructor(private accountSvc: AccountService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //console.log("AlwaysAuthGuard");
    console.log(this.accountSvc.getUserLoggedIn());
    
    if (this.accountSvc.getUserLoggedIn()) {
      return this.accountSvc.getUserLoggedIn();
    }
    else {
      this.router.navigate(['/']);
    }
    return false;
  }
}
