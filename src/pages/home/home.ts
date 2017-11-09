import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  res: any = {};
  lat: number;
  lng: number;
  public position;
  public marker;
  public options = {};
  constructor(public navCtrl: NavController, public af: AngularFireDatabase) {

  }
  ionViewDidLoad() {
    this.setLocation();
    this.getLocation();
  }
  setLocation() {
    let locationOptions = { timeout: 20000, enableHighAccuracy: true };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        this.af.object('myLatLng').set({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, (error) => {
        console.log(error);
      }, locationOptions
      );
    }


  }
  //MOSTRA NO MAPA
  getLocation() {
    const watch = this.af.object('myLatLng');
    watch.subscribe(res => {
      this.res = res;
      this.lat = this.res.lat;
      this.lng = this.res.lng;
      this.position = new google.maps.LatLng(this.lat, this.lng);
      this.options = {
        center: this.position,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      }
      this.map = new google.maps.Map(document.getElementById("map_canvas"), this.options);
      this.marker = new google.maps.Marker({
        position: this.position,
        icon: { url: 'https://github.com/igormelo/Angular4-firebase/blob/master/src/app/assets/bus-station.png?raw=true' },
      });
      this.marker.setMap(this.map);
    })
  }
}
