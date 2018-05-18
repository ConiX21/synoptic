import { Component, OnInit, Input } from '@angular/core';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'ny-synoptic-properties',
  templateUrl: './synoptic-properties.component.html',
  styleUrls: ['./synoptic-properties.component.css']
})
export class SynopticPropertiesComponent implements OnInit {
  @Input() activeComponent;
  constructor() {

  }

  //checked: string = "checked";
  ngOnInit() {
    this.initilizePanel();
  }

  applyFilterOnComponent(event) {
    this.activeComponent.changeFilterState(event.target.dataset.name, event.target.checked);
    this.activeComponent.setStateOfPropertiesJSON(event.target.dataset.name, event.target.checked);

    //Affiche une notification en haut de la page
    if (!event.target.checked)
      Materialize.toast(`Filter On ${event.target.dataset.name} activated`, 2000);
    else
      Materialize.toast(`Filter On ${event.target.dataset.name} desactivated`, 2000);

  }

  changeCheckBoxState(name: string) {
    jQuery(`input[name='${name}']`).prop('checked', true);
    Materialize.toast(`Filter On ${name} desactivated`, 2000);
  }

  initilizePanel() {
    //this.activeComponent.setStateOfPropertiesJSON(event.target.dataset.name, event.target.checked);
    let componentsSettings = this.activeComponent.getAllFiltersState();

    for (let element in componentsSettings) {
      for (let e in componentsSettings[element]) {
        jQuery(`input[name='filter${e}']`).prop('checked', componentsSettings[element][e].state);
      }
    }
  }

}
