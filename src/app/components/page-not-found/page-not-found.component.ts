import { Component, OnInit, animate, state, trigger, transition, style } from '@angular/core';

declare var jQuery;

@Component({
  selector: 'ny-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [trigger('visibility', [
    state('invisible', style({ opacity: 0 })),
    state('visible', style({ opacity: 1 })),
    transition('invisible => visible', animate(500))
  ])]
})
export class PageNotFoundComponent implements OnInit {
  private visible: boolean = false;
  private visibility: string = "invisible";
  constructor() { }

  ngOnInit() {
    this.fadeIn();
  }

  fadeIn(): void {
    this.visible = true;
    setTimeout(() => {this.visibility = "visible";}, 0);
  }
}
