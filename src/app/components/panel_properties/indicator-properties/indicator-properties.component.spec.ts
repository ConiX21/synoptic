/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndicatorPropertiesComponent } from './indicator-properties.component';
import { PropertyService } from '../../../services/property.service';

describe('IndicatorPropertiesComponent', () => {
  let component: IndicatorPropertiesComponent;
  let fixture: ComponentFixture<IndicatorPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [PropertyService],
      declarations: [ IndicatorPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
