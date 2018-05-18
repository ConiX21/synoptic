/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { SynopticCardComponent } from './synoptic-card.component';
import { SynopticService } from '../../services/synoptic.service';
import { GlobalSettings } from '../../global.settings';
import { Http, ConnectionBackend } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';

describe('SynopticCardComponent', () => {
  let component: SynopticCardComponent;
  let fixture: ComponentFixture<SynopticCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [RouterTestingModule],
      declarations: [ SynopticCardComponent ],
      providers : [SynopticService, GlobalSettings]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopticCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
