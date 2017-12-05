import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the SimutaleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SimutaleProvider {

  constructor() {
  }

  getBus(lat, lng) {
    let busData = this.buses[this.busIndex];
    this.busIndex++;

    if (this.busIndex > this.buses.length) {
      this.busIndex = 0;
    }
    return Observable.create(
      observer => observer.next(busData)
    )
  }
  private busIndex: number = 0;

  private bus1 = {
    bus: [{
      id: 1,
      coord: {
        lat: -22.716080,
        lng: -43.556403
      }
    },
    {
      id: 2,
      coord: {
        lat: -22.716377,
        lng: -43.555437
      }
    }]
  };
  private bus2 = {
    bus: [{
      id: 1,
      coord: {
        lat: -22.716696,
        lng: -43.554375
      }
    },
    {
      id: 2,
      coord: {
        lat: -22.716357,
        lng: -43.553420
      }
    }]
  };
  private buses: Array<any> = [this.bus1, this.bus2];
}
