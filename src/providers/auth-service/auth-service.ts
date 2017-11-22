import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
  }
  setRememberUser(username: string) {
    localStorage.setItem('storedUsername', username);
  }
  rememberUser(): string {
    return localStorage.getItem('storedUsername');
  }

}
