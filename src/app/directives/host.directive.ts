import { Directive, ViewContainerRef  } from '@angular/core';

@Directive({
  selector: '[ny-Host]'
})
export class HostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
