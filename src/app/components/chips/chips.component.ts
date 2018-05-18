import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ny-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {
  @Input() nbComponents;
  constructor() { }

  ngOnInit() {
  }

}
