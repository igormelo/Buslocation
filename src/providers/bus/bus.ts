import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { SimutaleProvider } from '../simutale/simutale';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the BusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusService {
  private simulate: SimutaleProvider;

  constructor(private af: AngularFireDatabase) {
    this.simulate = new SimutaleProvider();
  }
  getBus() {
    return this.af.list("Igor Melo").valueChanges();
  }

}
