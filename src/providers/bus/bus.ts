import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the BusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusService {
  private path = "Igor Melo";
  constructor(private af: AngularFireDatabase) {
  }
  getBus() {
    return this.af.list(this.path).valueChanges();
  }
  remove(key: string) {
    return this.af.list(this.path).remove(key);
  }

}
