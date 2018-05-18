import { Component, OnInit, animate, state, trigger, transition, style } from '@angular/core';
import { BaseComponent } from '../base-component';
import { Router } from '@angular/router';
import { SynopticService } from '../../services/synoptic.service';

@Component({
  selector: 'ny-synoptics',
  templateUrl: './synoptics.component.html',
  styleUrls: ['./synoptics.component.css'],
  providers: [SynopticService]
})
export class SynopticsComponent extends BaseComponent implements OnInit {

  private idActive: number;
  public synoptics: any = [];
  constructor(public router: Router, public synopticSvc: SynopticService) {
    super();
  }

  ngOnInit() {
    this.synopticSvc.getSynoptics().subscribe(synoptics => {
      console.log(synoptics);
        this.synoptics = synoptics
   }, error => {console.log(error)});
  }



  delete(yesNo: boolean) {

  }

}
