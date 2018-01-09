import { Geolocation } from '@ionic-native/geolocation';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { MylocationComponent } from '../mylocation/mylocation';
import { Observable } from 'rxjs/Observable';
import { GoogleMaps } from '@ionic-native/google-maps';
import { } from '@types/googlemaps';
import { BuslocationComponent } from '../buslocation/buslocation';


declare var google: any;
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
  public map: google.maps.Map;
  public mapIdle: boolean;
  constructor(public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public geolocation: Geolocation) {

  }
  ngOnInit() {
    window.localStorage.getItem('user');
    window.localStorage.getItem('pass');
    this.getCurrentLocation().subscribe(location => {
      this.map.panTo(location);
    })
    this.map = this.createMap();
    this.addMapEventListener();
  }
  addMapEventListener() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.mapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.mapIdle = true;
    })
  }

  getCurrentLocation() {
    let loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loading.present();
    let locationOptions = { timeout: 20000, enableHighAccuracy: true };
    let Obs = Observable.create(observable => {
      this.geolocation.getCurrentPosition(locationOptions)
        .then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          let location = new google.maps.LatLng(lat, lng);
          observable.next(location);
          loading.dismiss();
        }, (err) => {
          console.log("Geolocation error:" + err);
          loading.dismiss();
        })
    })
    return Obs;
  }

  createMap(location = new google.maps.LatLng(9, 9)) {
    let options = {
      center: location,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let mapElement = document.getElementById("map_canvas");
    let map = new google.maps.Map(mapElement, options);
    return map;
  }

  centerLocation(location) {
    if (location) {
      this.map.panTo(location);
    } else {
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      });
    }
  }

}
