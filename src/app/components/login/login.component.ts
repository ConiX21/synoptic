import { Component, OnInit, Input, Inject, state, trigger, animate, style, transition } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/Account';
import { BaseComponent } from '../base-component';
import { ViewChild } from '@angular/core/src/metadata/di';
import { ErrorComponent } from '../error/error.component';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ny-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loadLogin', [
      state('void', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('void <=> visible', animate(800))
    ])
  ]
})
export class LoginComponent extends BaseComponent implements OnInit {
  private state: string = "visible";
  private errorState: string = "invisible";
  public errorMessage: string;
  public error: boolean = false;
  private loginForm: FormGroup;
  private aes: any;
  private data;
  private session;
  
  constructor(private accountSvc: AccountService, public fb: FormBuilder, public router: Router) {
    super();
  }

  /**
   * @author Nicolas GASQUET
   * @description Initialize component
   */
  ngOnInit() {
    
    this.loginForm = this.fb.group({
      login: this.fb.control('Nico', [Validators.required]),
      password: this.fb.control('1234', [Validators.required])
    });
  }

  /**
   * @author Nicolas GASQUET
   * @description Send user information to authentification Service
   * @param form - form where user data was write
   */
  connect(form) {
      this.validationUserData(form);
  }

  /**
   * @author Nicolas GASQUET
   * @param form - using the form to retrieve user data
   * @description valid data and create SessionStorage key/value
   * @exception Error
   */
  validationUserData(form) {
    if (form.login == '' || form.login == null || form.password == '' && form.password == null) {
      throw new Error("login/password are not valid");
    }
    else {
      this.accountSvc.connect(form.login, form.password).subscribe(
        user => {
          if(user == null){
            this.errorConnect("login/password are not valid.")
          }
        this.accountSvc.setUserLoggedIn();
        this.router.navigate(['/synoptics']);
      }, 
      error => this.errorConnect(error));
    }
  }
  
  /**
   * @author Nicolas GASQUET
   * @param error - Represent object result with error
   * @description Change visual state of login component 
   */
  errorConnect(error) {
    this.errorState = "visible";
    this.errorMessage = error;
  }
}
