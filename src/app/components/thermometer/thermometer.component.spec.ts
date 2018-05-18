/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThermometerComponent } from './thermometer.component';
import { RatioService } from '../../services/ratio.service';

var ratioServiceStub = {
  isLoggedIn: true,
  user: { name: 'Test User'}
};

describe('ThermometerComponent', () => {
  let component: ThermometerComponent;
  let fixture: ComponentFixture<ThermometerComponent>;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermometerComponent ],
      providers:    [ RatioService ]
    })
    .compileComponents();
    var ratioService = TestBed.get(RatioService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
