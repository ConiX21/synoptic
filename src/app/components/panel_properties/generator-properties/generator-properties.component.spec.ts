/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeneratorPropertiesComponent } from './generator-properties.component';
import { PropertyService } from '../../../services/property.service';

describe('GeneratorPropertiesComponent', () => {
  let component: GeneratorPropertiesComponent;
  let fixture: ComponentFixture<GeneratorPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [PropertyService],
      declarations: [ GeneratorPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
