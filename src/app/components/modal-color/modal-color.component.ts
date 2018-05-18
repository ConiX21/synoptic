import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';


declare var jQuery;
@Component({
  selector: 'ny-modal-color',
  templateUrl: './modal-color.component.html',
  styleUrls: ['./modal-color.component.css']
})
export class ModalColorComponent implements OnInit, OnDestroy {

  @Input() activeComponent;
  @Input() property;
  activeColor: string;

  colors: Array<string> = ["#ffebee", "#ffcdd2", "#ef9a9a", "#ef9a9a", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c",
    "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f",
    "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#7b1fa2", "#4a148c",
    "#c5cae9", "#9fa8da", "#7986cb", "#5c6bc0", "#3f51b5", "#3949ab", "#303f9f", "#283593", "#1a237e", "#bbdefb",
    "#90caf9", "#64b5f6", "#42a5f5", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1",
    "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20",
    "#dcedc8", "#c5e1a5", "#aed581", "#9ccc65", "#8bc34a", "#7cb342", "#689f38", "#558b2f", "#33691e",
    "#fff9c4", "#fff59d", "#fff176", "#ffee58", "#ffeb3b", "#fdd835", "#fbc02d", "#f9a825", "#f57f17",
    "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100",
    "#d7ccc8", "#bcaaa4", "#a1887f", "#8d6e63", "#795548", "#6d4c41", "#5d4037", "#4e342e", "#3e2723",
    "#fafafa", "#e0e0e0", "#bdbdbd", "#9e9e9e", "#757575", "#616161", "#424242", "#212121",
    "#78909c", "#607d8b", "#546e7a", "#455a64", "#37474f", "#263238", "#000000", "#FFFFFF"]
  constructor() { }

  ngOnInit() {
  }

  chooseColor(event) {
  //debugger
  this.activeComponent[this.property] = event.target.style.backgroundColor; 
   //this.property = event.target.style.backgroundColor;
     jQuery('#modalColor').modal('close');
  }

   ngOnDestroy() {
    // prevent memory leak when component destroyed
    // this.subscription.unsubscribe();
    console.log("destroye");
  }

  colorHover(event) {
    this.activeColor = event.target.style.backgroundColor;
  }
}
