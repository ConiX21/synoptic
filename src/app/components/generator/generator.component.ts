import { Component, OnInit, ElementRef } from '@angular/core';
import { WorkspaceBaseComponent } from '../workspace-base-component';
import { RatioService } from '../../services/ratio.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ny-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent extends WorkspaceBaseComponent implements OnInit {
  name: string = "Generator";
  batteryColor: string = "#808080";
  valueColor: string = "white";
  unitText: string = "mA";
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
    this.settingsEvent.emit({object: this, title: "Generator"});
  }

  loadProperties(prop: any) {
    this.name = prop.name;
    this.batteryColor = prop.batteryColor;
    this.unitColor = prop.unitColor;
    this.valueColor = prop.valueColor;
  }
}
