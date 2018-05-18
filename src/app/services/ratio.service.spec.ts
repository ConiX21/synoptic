/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RatioService } from './ratio.service';

describe('RatioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatioService]
    });
  });

  it('should ...', inject([RatioService], (service: RatioService) => {
    expect(service).toBeTruthy();
  }));
});
