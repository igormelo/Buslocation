import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { SimutaleProvider } from '../simutale/simutale';

/*
  Generated class for the BusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusService {
  private simulate: SimutaleProvider;

  constructor() {
    this.simulate = new SimutaleProvider();
  }
  getBus(lat, lng) {
    console.log("oi");
    return Observable
      .interval(2000)
      .switchMap(() => this.simulate.getBus(lat, lng))
      .share();
  }

}
