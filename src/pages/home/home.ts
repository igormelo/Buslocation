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
  public options = {};
  constructor(public navCtrl: NavController, public af: AngularFireDatabase) {

  }
  ionViewDidLoad() {
    this.initMap();
    this.myLocation();
  }
  initMap() {
    let locationOptions = { timeout: 20000, enableHighAccuracy: true };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.af.object('myLatLng').update({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, (error) => {
        console.log(error);
      }, locationOptions
      );
    }


  }
  myLocation() {
    this.af.object('myLatLng').subscribe(res => {
      this.res = res;
      this.lat = this.res.lat;
      this.lng = this.res.lng;
      this.options = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: 25,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(document.getElementById("map_canvas"), this.options);
    })
  }

}
