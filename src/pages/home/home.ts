import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  res: any = {};
  constructor(public navCtrl: NavController, public af: AngularFireDatabase) {

  }
  ionViewDidLoad() {
    this.initMap();
    this.af.object('myLatLng').subscribe(res => {
      this.res = res;
      console.log(res);
    })
  }
  initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.af.object('myLatLng').update({
          lat: 22,//position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }

  }

}
