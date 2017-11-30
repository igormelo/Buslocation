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
    return Observable.create(observer => observer.next(busData))
  }
  private busIndex: number = 0;

  private bus1 = {
    bus: [{
      id: 1,
      coord: {
        lat: -22.907547,
        lng: -43.174360
      }
    },
    {
      id: 2,
      coord: {
        lat: -22.907622,
        lng: -43.175186
      }
    }]
  };
  private bus2 = {
    bus: [{
      id: 1,
      coord: {
        lat: -22.907820,
        lng: -43.176302
      }
    },
    {
      id: 2,
      coord: {
        lat: -22.908079,
        lng: -43.176768
      }
    }]
  };
  private buses: Array<any> = [this.bus1, this.bus2];
}
