/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SynopticPropertiesComponent } from './synoptic-properties.component';
import { PropertyService } from '../../../services/property.service';

describe('SynopticPropertiesComponent', () => {
  let component: SynopticPropertiesComponent;
  let fixture: ComponentFixture<SynopticPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [PropertyService],
      declarations: [ SynopticPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopticPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
