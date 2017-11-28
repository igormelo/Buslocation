import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';


declare var google;
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
  public map;
  initLat: number;
  initLng: number;
  data: any;
  lat: number;
  lng: number;
  location: any;
  constructor(public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {

  }
  ngOnInit() {
    this.createMap();
  }

  setLocation() {
    let locationOptions = { timeout: 20000, enableHighAccuracy: true };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        this.af.object('oi').set({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

      }, (error) => {
        console.log(error);
      }, locationOptions
      );
    }
  }

  getCurrentLocation() {
    let load = this.loading.create({
      content: 'Aguarde...'
    }).present();
    const watch = this.af.object('oi')
    watch.subscribe((data) => {
      this.data = data;
      this.lat = data.lat;
      this.lng = data.lng;
      this.location = new google.maps.LatLng(this.lat, this.lng);
      let marker = new google.maps.Marker({ position: this.location, map: this.map });
    });
  }


  createMap(location = new google.maps.LatLng(-22.8996444, -43.1778848)) {
    let options = {
      center: location,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
  }

}
