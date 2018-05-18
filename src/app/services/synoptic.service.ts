
import { Account } from '../models/Account';
import { Service } from './service';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { GlobalSettings } from '../global.settings';
import { Http } from '@angular/http';
import { Synoptic } from "../models/Synoptic";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Essai } from '../models/essai';



@Injectable()
export class SynopticService extends Service{

  public synoptics: any = [
    {id: 1, creator : "coni", image: "background_test.jpg", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 2, creator : "coni", image: "background_test.jpg", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 3, creator : "coni", image: "background_test.jpg", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 4, creator : "quelqu'un", image: "logo.png", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 5, creator : "quelqu'un d'autre", image: "logo.png", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 6, creator : "encore un autre", image: "logo.png", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 7, creator : "coni", image: "background_test.jpg", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 8, creator : "coni", image: "background_test.jpg", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"},
    {id: 9, creator : "coni", image: "background_test.jpg", title: "Un titre de fou", date : new Date().toLocaleDateString('fr-FR'), description:"Cillum sunt incididunt ipsum esse id labore voluptate nostrud irure officia pariatur Lorem non. Irure fugiat consectetur officia velit occaecat magna dolor duis tempor irure voluptate fugiat elit cill"}   
  ];

  constructor(protected settings:GlobalSettings, protected http:HttpClient) {
    super(settings, http)
  }

  getSynoptics(): Observable<Array<Synoptic>> {
    return this.http.get<Array<Synoptic>>(`${this.settings.servicePath}/synoptics`)
              .catch(this.handleError);
  }


  getSynopticById(id: number): Synoptic {
    let synoptic = new Synoptic();
    synoptic.idSynoptic = id;
    synoptic.title = this.synoptics[id].title;
    synoptic.description = this.synoptics[id].description;
    synoptic.creator = this.synoptics[id].creator;
    synoptic.image = this.synoptics[id].image;
    
    return synoptic;
  }

  getEssais():Observable<Array<Essai>>{
    return this.http.get<Array<Essai>>(`${this.settings.servicePath}/essais`)
                    .catch(this.handleError);;
  }

  removeSynopticById(id: number): void {
    console.log("Synoptic " + id + "\0deleted");
  }
 

  private handleError(err : HttpErrorResponse){
    return Observable.throw(err.message);
  }

}

