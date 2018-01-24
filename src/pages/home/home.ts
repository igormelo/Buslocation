import { MapComponent } from './../../components/map/map';
import { MylocationComponent } from './../../components/mylocation/mylocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage, ViewController } from 'ionic-angular';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize';
import { LoginPage } from '../login/login';
import { window } from 'rxjs/operator/window';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StatusBar } from '@ionic-native/status-bar';
import { AboutPage } from '../about/about';
import { Nav } from 'ionic-angular';
declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string;
  photoURL: any;
  lat: number;
  lng: number;
  public isLogged: boolean;
  email: string;
  autocompleteItems: any;
  autocomplete: any;
  acService: any;
  geo: any;
  placesService: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public maps: GoogleMaps, private af: AngularFireDatabase, public afAuth: AngularFireAuth, private statusBar: StatusBar, public viewCtrl: ViewController) {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
  ionViewDidLoad() {
    this.name = this.navParams.get('name');
    this.photoURL = this.navParams.get('img');
    this.toastCtrl.create({
      message: `Bem vindo:  ${this.name}`,
      duration: 3000
    }).present();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  about() {
    this.navCtrl.push(AboutPage, { name: this.name, img: this.photoURL })
  }

  searchResult() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      input: this.autocomplete.query,
      componentRestriction: { country: 'BR' }
    }
    this.acService.getPlacePredictions(config, (predictions, status) => {
      this.autocompleteItems = [];
      predictions.forEach(element => {
        self.autocompleteItems.push(element.description);
      });
    })
  }
  chooseItem(item: any) {
    this.geo = item;
    this.geoCode(this.geo);
  }
  geoCode(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      this.lat = results[0].geometry.location.lat();
      this.lng = results[0].geometry.location.lng();
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
