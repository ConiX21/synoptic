import { Component, OnInit, ElementRef } from '@angular/core';
import { WorkspaceBaseComponent } from '../workspace-base-component';
import { RatioService } from '../../services/ratio.service';

@Component({
  selector: 'ny-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent extends WorkspaceBaseComponent implements OnInit {

  //Configuration
  name: string = "Thermometer";
  mercuryColor: string = "red";
  valueColor: string = "white";
  unitText: string = "°C";
  unitColor: string = "white";

  value: string = "100.00";
  
  components: Array<any> = [];

  constructor(public element: ElementRef, private ratioSvc: RatioService) {
    super(element);

    this.subscription = this.ratioSvc.ratioChanged$.subscribe(ratio => {
      this.ratio = ratio
    });
  }

  ngOnInit() {
  }

  onSettings(event) {
    this.settingsEvent.emit({object: this, title: "Thermometer"});
  }

  loadProperties(prop: any) {
    this.name = prop.name;
    this.mercuryColor = prop.mercuryColor;
    this.unitColor = prop.unitColor;
    this.valueColor = prop.valueColor;
  }
}
