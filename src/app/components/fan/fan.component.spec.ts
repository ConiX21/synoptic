/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FanComponent } from './fan.component';
import { RatioService } from '../../services/ratio.service';

describe('FanComponent', () => {
  let component: FanComponent;
  let fixture: ComponentFixture<FanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanComponent ],
      providers:    [ RatioService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
