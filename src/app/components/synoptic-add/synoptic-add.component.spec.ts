/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SynopticAddComponent } from './synoptic-add.component';

describe('SynopticAddComponent', () => {
  let component: SynopticAddComponent;
  let fixture: ComponentFixture<SynopticAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopticAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopticAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
