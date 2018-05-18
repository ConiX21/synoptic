/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalTextComponent } from './modal-text.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ModalTextComponent', () => {
  let component: ModalTextComponent;
  let fixture: ComponentFixture<ModalTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule, ReactiveFormsModule],
      declarations: [ ModalTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
