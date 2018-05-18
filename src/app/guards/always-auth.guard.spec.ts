import { TestBed, async, inject } from '@angular/core/testing';

import { AlwaysAuthGuard } from './always-auth.guard';
import { AccountService } from '../services/account.service';
import { GlobalSettings } from '../global.settings';
import { MockAccountService } from '../../mocks/MockAccountService';
import { MockGlobalSettings } from '../../mocks/MockGlobalSettings';

describe('AlwaysAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlwaysAuthGuard, 
        { provide: AccountService, useValue: new MockAccountService() },
        { provide: GlobalSettings, useValue: MockGlobalSettings }]
  });

  it('should ...', inject([AlwaysAuthGuard], (guard: AlwaysAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
