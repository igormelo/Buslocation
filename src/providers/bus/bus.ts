import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

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
    return firebase.database().ref('Igor');
  }
  remove(key: string) {
    return this.af.list(this.path).remove(key);
  }
  getObject() {
    return this.af.database.ref("users/");
  }
  getObj() {
    return Observable.interval(2000).switchMap(() => this.af.list('Lord').valueChanges())
      .share();
  }

}
