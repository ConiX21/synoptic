import { Component, OnInit, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { WorkspaceBaseComponent } from '../workspace-base-component';
import { RatioService } from '../../services/ratio.service';



@Component({
  selector: 'ny-indicator',
  templateUrl: 'indicator.component.html',
  styleUrls: ['indicator.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  //host:{"(click)":"doSomething()"},
})
export class IndicatorComponent extends WorkspaceBaseComponent implements OnInit {
  name: string = "Indicator";
  ledColorTrue: string = "#558b2f";
  ledColorFalse: string = "#C62828";
  textColorTrue: string = "white";
  textColorFalse: string = "white";
  textTrue: string = "True";
  textFalse: string = "False";

  statusLedColor: string;
  statusTextColor: string;
  statusText: string;
  status: boolean = false;


  constructor(public element: ElementRef, private ratioSvc: RatioService) {
    super(element);

    this.subscription = this.ratioSvc.ratioChanged$.subscribe(
      ratio => {
        this.ratio = ratio
      });
  }

  ngOnInit() {
    setInterval(() => {
      if (this.status === true) {
        this.statusLedColor = this.ledColorTrue;
        this.statusText = this.textTrue;
        this.statusTextColor = this.textColorTrue;
        this.status = false;
      } else {
        this.statusLedColor = this.ledColorFalse;
        this.statusText = this.textFalse;
        this.statusTextColor = this.textColorFalse;
        this.status = true;
      }
    }, 1000);
  }

  onSettings(event) {
    this.settingsEvent.emit({object: this, title: "Indicator"});
  }

  loadProperties(prop: any) {
    this.name = prop.name;
    this.ledColorTrue = prop.ledColorTrue;
    this.ledColorFalse = prop.ledColorFalse;
    this.textColorTrue = prop.textColorTrue;
    this.textColorFalse = prop.textColorFalse;
    this.textTrue = prop.textTrue;
    this.textFalse = prop.textFalse;
  }
}
