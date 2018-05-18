import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { WorkspaceBaseComponent } from '../workspace-base-component';
import { RatioService } from '../../services/ratio.service';

@Component({
  selector: 'ny-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent extends WorkspaceBaseComponent implements OnInit {
  name: string = "Gauge";
  valueColor: string = "white";
  unitColor: string = "white";
  value: string = "100.00";

  constructor(public element: ElementRef, private ratioSvc: RatioService) {
    super(element);

    this.subscription = this.ratioSvc.ratioChanged$.subscribe(
      ratio => {
        this.ratio = ratio
      });
  }

  ngOnInit() {
  }
  
  onSettings(event) {
    this.settingsEvent.emit({object: this, title: "Gauge"});
  }

  loadProperties(prop: any) {
    this.name = prop.name;
    this.unitColor = prop.unitColor;
    this.valueColor = prop.valueColor;
  }
}
