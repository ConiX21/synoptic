import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { WorkspaceBaseComponent } from '../workspace-base-component';
import { RatioService } from '../../services/ratio.service';

@Component({
  selector: 'ny-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FanComponent extends WorkspaceBaseComponent implements OnInit {
  name: string = "Fan";
  fanColor: string = "#808080";
  unitText: string = "tr/min";
  unitColor: string = "white";
  valueColor: string = "white";

  value: string = "100.00";

  constructor(public element: ElementRef, private ratioSvc: RatioService) {
    super(element);
    this.subscription = this.ratioSvc.ratioChanged$.subscribe(
      ratio => {
        this.ratio = ratio
      });
  }

  ngOnInit() {
    //console.log(this.colorSkin.fan.hex);
  }

  onSettings(event) {
    this.settingsEvent.emit({object: this, title: "Fan"});
  }

  loadProperties(prop: any) {
    this.name = prop.name;
    this.fanColor = prop.fanColor;
    this.unitColor = prop.unitColor;
    this.valueColor = prop.valueColor;
  }
}
