import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ny-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  statusLoader:string = "Initializing...";
  constructor() { }

  ngOnInit() {
  }

}
