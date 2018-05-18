import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PropertyService {

  private  propertySource = new Subject<string>();
  constructor() { }

 propertyChangedjQuery = this.propertySource.asObservable();

  setProperty(value:string){
    this.propertySource.next(value);
  }
}
