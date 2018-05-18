import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ny-modal-yes-no',
  templateUrl: './modal-yes-no.component.html',
  styleUrls: ['./modal-yes-no.component.css']
})
export class ModalYesNoComponent implements OnInit {

  @Input() message: string;
  @Input() id: string = "modalYesNo";
  @Output() onClick = new EventEmitter <boolean> ();

  constructor() {}

  ngOnInit() {
  }

  click(yesNo: boolean): void {
    this.onClick.emit(yesNo);
  }

  setMessage(message: string): void {
    this.message = message;
  }
}
