/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Crypto } from '../../utils/crypto';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Account} from '../../models/Account'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * Mocks and Stubs import
 */
import { RouterStub } from '../../../mocks/RouterStub';
import { MockAccountService } from '../../../mocks/MockAccountService';
import { MockGlobalSettings } from '../../../mocks/MockGlobalSettings';
import { GlobalSettings } from '../../global.settings';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountService : AccountService;
  let spy ;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [LoginComponent],
      providers: [
        { provide: AccountService, useValue: new MockAccountService() },
        { provide: GlobalSettings, useValue: MockGlobalSettings },
        Crypto,
        NgForm,
        { provide: Router, useValue: RouterStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    accountService = TestBed.get(AccountService);
  });

  afterEach(() => {
    accountService = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it("login password should not be null", () => {
    //Arrange
    let account  =  new Account();

    //Acte
    let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
    let loginControl = form.control.get('login');
    let passwordControl = form.control.get('password');

    //Assert
    expect(() => {
      component.validationUserData(form)
    }).toThrowError("login/password are not valid");
  })

  it("login password should not be empty", () => {
    //Arrange
    let account  =  new Account();

    //Acte
    let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
    let loginControl = "";
    let passwordControl ="";

    //Assert
    expect(() => {
      component.validationUserData(form)
    }).toThrowError("login/password are not valid");
  })

  it("login/password should be good", () => {
    //Arrange
    let account  =  new Account();
    account.login = "Nicolas",
    account.password = "1234";

    //Acte
    let accountResult = accountService.connect("Nicolas", "1234");

    //Assert
    expect(accountResult).toEqual(account);
    expect(accountService.getUserLoggedIn()).toBeTruthy();
  })

  it("login/password should be wrong", () => {
    //Arrange
    let account  =  new Account();
    account.login = "Nicolas",
    account.password = "1234";

    //Acte
    let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
    //let accountResult = accountService.connect("Nicolas", "12345");

    //Assert
    expect(() => {
      component.validationUserData(form)
      accountService.connect("Nicolas", "12345");
    }).toThrowError("login/password are not valid");
    expect(accountService.getUserLoggedIn()).toBeFalsy();
  })


});
