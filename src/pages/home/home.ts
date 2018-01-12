import { MapComponent } from './../../components/map/map';
import { MylocationComponent } from './../../components/mylocation/mylocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize';
import { LoginPage } from '../login/login';
import { window } from 'rxjs/operator/window';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string;
  photoURL: any;
  initLat: number;
  initLng: number;
  public isLogged: boolean;
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public maps: GoogleMaps, private af: AngularFireDatabase, public afAuth: AngularFireAuth, private statusBar: StatusBar) {

  }
  ionViewDidLoad() {
    this.name = this.navParams.get('name');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.initLat = position.coords.latitude;
        this.initLng = position.coords.longitude;
        this.af.object(this.name).update({ lat: this.initLat, lng: this.initLng });
      });
    }

    this.toastCtrl.create({
      message: `Bem vindo:  ${this.name}`,
      duration: 3000
    }).present();
  }
  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
