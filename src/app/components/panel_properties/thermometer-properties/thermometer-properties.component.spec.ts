/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThermometerPropertiesComponent } from './thermometer-properties.component';
import { PropertyService } from '../../../services/property.service';

describe('ThermometerPropertiesComponent', () => {
  let component: ThermometerPropertiesComponent;
  let fixture: ComponentFixture<ThermometerPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [PropertyService],
      declarations: [ ThermometerPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermometerPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
