
import { Account } from '../models/Account';
import { Service } from './service';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { GlobalSettings } from '../global.settings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class AccountService extends Service {
  private isUserloggedIn: boolean;

  constructor(protected settings: GlobalSettings, protected http: HttpClient) {
    super(settings, http);
    this.isUserloggedIn = false;
  }

  /**
   * @author Nicolas GASQUET
   * @description Cold Observable return a result just when we invok subscribe
   * @param login 
   * @param password
   */
  connect(login: string, password: string): Observable<Account> {
    let apiURL = `${this.settings.servicePath}/user`;

    return this.http.post<Account>(apiURL, {login : login, password : password})
                    .catch(this.handleError);
  }

  setUserLoggedIn() {
    this.isUserloggedIn = true;
  }

  getUserLoggedIn(): boolean {
    return this.isUserloggedIn;
  }

  private handleError(err : HttpErrorResponse){
    return Observable.throw(err.message);
  }
}
