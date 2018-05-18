import { Component, OnInit, Input, Inject, state, trigger, animate, style, transition } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  animations: [
    trigger('errorEffect', [
      state('visible', style({ opacity: 1 })),
      state('invisible', style({ opacity: 0 })),
      transition('invisible <=> visible', animate(1800))
    ])
  ]
})
export class ErrorComponent implements OnInit {
  @Input() componentState: string;
  @Input() errorMessage: string;
  constructor() { }

  ngOnInit() {
    console.log(this.componentState)
  }
  //Events EFfects 
  endErrorEffect(state) {
    //ne pas vide le formulaire au démarrage
    if (state.fromState !== 'void') {
      //this.error = false;
      //this.errorState = "invisible";
      //this.loginForm.reset();
    }
  }
}
