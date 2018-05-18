import { Component, OnInit, Input } from '@angular/core';
import  { PropertyService } from '../../../services/property.service'; 

declare var jQuery;

@Component({
  selector: 'ny-generator-properties',
  templateUrl: './generator-properties.component.html',
  styleUrls: ['./generator-properties.component.css']
})
export class GeneratorPropertiesComponent implements OnInit {

  actualProperty: string; //set or get the actual propeety would like to set or get
  @Input() activeComponent;

  constructor(private propertySvc:PropertyService) { }

  ngOnInit() {
  }

  onOpenColor(event, property) {
    //Set la propriete et la passe au service 
    this.propertySvc.setProperty(property);
    jQuery('#modalColor').modal('open');
  }

  onOpenText(event, property) {
    //Set la propriete et la passe au service 
    this.propertySvc.setProperty(property);    
    jQuery('#modalText').modal('open');
  }
}
