/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountService } from './account.service';
import { GlobalSettings } from '../global.settings';


describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService, GlobalSettings]
    });
  });

  it('should ...', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
