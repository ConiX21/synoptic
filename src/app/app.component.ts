import { Component } from '@angular/core';
import {BaseComponent} from './components/base-component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent extends BaseComponent {

  title = 'app works!';

  constructor(){
    super();
  }
  
  fullScreen() {


    var docElm = document.body;

    // document.fullscreenElement;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }

  }

}
