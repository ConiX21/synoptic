/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SynopticService } from './synoptic.service';
import { GlobalSettings } from '../global.settings';
import { Http, ConnectionBackend } from '@angular/http';

describe('SynopticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynopticService, GlobalSettings, Http, ConnectionBackend]
    });
  });

  it('should ...', inject([SynopticService], (service: SynopticService) => {
    expect(service).toBeTruthy();
  }));
});
