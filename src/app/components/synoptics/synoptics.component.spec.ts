/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SynopticsComponent } from './synoptics.component';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { SynopticService } from '../../services/synoptic.service';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('SynopticsComponent', () => {
  let component: SynopticsComponent;
  let fixture: ComponentFixture<SynopticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SynopticsComponent],
      providers: [
        AccountService,
        { provide: Router, useClass: RouterStub }
        , SynopticService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
