import { MapComponent } from './../../components/map/map';
import { MylocationComponent } from './../../components/mylocation/mylocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize';


declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public location: any;
  public map: any;
  name: string;
  photoURL: any;
  public data: any = {};
  lat: number;
  lng: number;
  initLat: number;
  initLng: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public maps: GoogleMaps) {

  }
  ionViewDidLoad() {
    this.name = this.navParams.get('name');
    this.photoURL = this.navParams.get('photoURL');
    this.initLat = this.navParams.get('initLat');
    this.initLng = this.navParams.get('initLng');
    console.log(this.initLat);

    this.toastCtrl.create({
      message: `Bem vindo:  ${this.name}`,
      duration: 3000
    }).present();
  }




}
