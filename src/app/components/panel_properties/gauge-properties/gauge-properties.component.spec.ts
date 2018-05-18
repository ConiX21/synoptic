/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GaugePropertiesComponent } from './gauge-properties.component';
import { PropertyService } from '../../../services/property.service';

describe('GaugePropertiesComponent', () => {
  let component: GaugePropertiesComponent;
  let fixture: ComponentFixture<GaugePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [PropertyService],
      declarations: [ GaugePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
