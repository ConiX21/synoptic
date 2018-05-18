import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable} from '@angular/core';

import { GlobalSettings } from '../global.settings';
import { HttpClient } from '@angular/common/http';

@Injectable()
export abstract class Service {
    protected servicePath = "http://localhost:3000/api/"
    protected headers = new Headers();
    protected options;

    constructor(protected settings:GlobalSettings, protected http: HttpClient) {
        this.headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers })
    }
}
