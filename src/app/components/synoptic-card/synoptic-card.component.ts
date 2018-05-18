import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base-component';
import { Router, NavigationExtras } from '@angular/router';

import { SynopticService } from '../../services/synoptic.service';

declare var $;

@Component({
  selector: 'ny-synoptic-card',
  templateUrl: './synoptic-card.component.html',
  styleUrls: ['./synoptic-card.component.css'],
  providers: [SynopticService]
})
export class SynopticCardComponent extends BaseComponent implements OnInit {
  @Input() element: any;
  @Output() onClick = new EventEmitter <number> ();
  constructor(public router: Router, public synopticService: SynopticService) { 
    super();
  }

  ngOnInit() {
  }

  startWorkspace(mode: string) {
    this.router.navigate(["/synoptic/workspace/"+this.element.id+"/"+mode]);
  }

  onOpenYesNo(): void {
    $('#modalYesNo').modal('open');
    this.onClick.emit(this.element.id);
  }
}
