import { Component, OnInit, OnDestroy, Input } from '@angular/core';

declare var $;

@Component({
  selector: 'ny-modal-voie',
  templateUrl: './modal-voie.component.html',
  styleUrls: ['./modal-voie.component.css']
})
export class ModalVoieComponent implements OnInit {

  @Input() activeComponent;
  @Input() property;
  
  voies: Array<any> = [
    {id: "1", name: "Voie 1"},
    {id: "2", name: "Voie 2"},
    {id: "3", name: "Voie 3"},
    {id: "4", name: "Voie 4"},
    {id: "5", name: "Voie 5"}
  ]

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  chooseVoie(event) {
  debugger
  this.activeComponent[this.property] = event.target.style.backgroundColor; 
   //this.property = event.target.style.backgroundColor;
     $('#modalVoie').modal('close');
  }

   ngOnDestroy() {
    // prevent memory leak when component destroyed
    // this.subscription.unsubscribe();
    console.log("destroye");
  }
}