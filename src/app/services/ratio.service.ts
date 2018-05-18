import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class RatioService {

  private ratioSource = new BehaviorSubject<any>({"height": window.innerHeight/6.5, "width": (window.innerHeight/6.5)*1.25});
  constructor() { }

  ratioChanged$ = this.ratioSource.asObservable();

  setRatio(value:any){
    this.ratioSource.next(value);
  }
}
