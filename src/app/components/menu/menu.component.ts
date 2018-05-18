import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IndicatorComponent } from '../indicator/Indicator.component';
import { WorkspaceBaseComponent } from '../Workspace-base-component';
import { colorTemplate } from '../../../environments/color-skin';

@Component({
  selector: 'ny-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() onCreated = new EventEmitter<string>();
  @Output() onZoom = new EventEmitter<string>();
  @Output() onSettings = new EventEmitter<void>();
  @Output() onDeleteAll = new EventEmitter <void>();
  @Output() onSave = new EventEmitter <void>();
  menu: boolean = false;
  zoomState: string = "onlyIn";
  colorSkin = colorTemplate;
  
  @Input() actualZoom: number;
  @Input() maxZoom: number;
  @Input() isEdit: boolean;

  constructor() { }

  ngOnInit() {
    this.checkZoom();
  }

  ngOnChanges() {
    this.checkZoom();
  }

  createComponent(name: string) {
    this.onCreated.emit(name);
  }

  zoom(way:string){
    this.onZoom.emit(way);
    if (way == "in") ++this.actualZoom;
    else --this.actualZoom;
    if (this.actualZoom == this.maxZoom) {
      this.zoomState = "onlyOut";
    } else if (this.actualZoom == 0) {
      this.zoomState = "onlyIn";
    } else {
      this.zoomState = "both";
    }
  }

  checkZoom() {
    if (this.actualZoom == this.maxZoom) {
      this.zoomState = "onlyOut";
    } else if (this.actualZoom == 0) {
      this.zoomState = "onlyIn";
    } else {
      this.zoomState = "both";
    }
  }

  settings() {
    this.onSettings.emit();  
  }

  deleteAll() {
    this.onDeleteAll.emit();
  }

  save() {
    this.onSave.emit();
  }
}
