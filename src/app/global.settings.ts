import { Injectable } from '@angular/core';

/**
 * @author Nicolas GASQUET
 * @description It's a globals service. Give values for all Synoptic App
 */
@Injectable()
export class GlobalSettings {
  public servicePath: string = 'http://localhost:3000/api';
}