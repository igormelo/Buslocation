import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BusService } from './../../providers/bus/bus';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as SlidingMarker from 'marker-animate-unobtrusive';
import * as firebase from 'firebase/app';

declare var google: any;
@Component({
  selector: 'buslocation',
  templateUrl: 'buslocation.html',
  providers: [BusService]
})
export class BuslocationComponent implements OnInit {
  @Input() map: google.maps.Map;
  public busMarker: Array<google.maps.Marker>;
  private popup: google.maps.InfoWindow;
  private myPos: google.maps.Marker;
  public polyline: google.maps.Polyline;
  constructor(private af: AngularFireDatabase, private busService: BusService, private geolocation: Geolocation) {
    this.busMarker = [];
  }
  ngOnInit() {

  }
  ngOnChanges() {
    this.addMyPosition();
    this.loadData();
  }

  loadData() {
    this.busService.getBus().subscribe(snap => {
      snap.forEach(position => {
        console.log(position);
        this.updateBusMarker(position);
      })
    });
  }

  addMyPosition() {
    this.myPos = new google.maps.Marker({
      map: this.map,
      position: this.map.getCenter(),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8.0,
        fillColor: "#769fe0",
        fillOpacity: 0.8,
        strokeWeight: 1.5
      }
    })

  }
  showPickupTime() {
    this.popup = new google.maps.InfoWindow({
      content: '<h5>Voce esta aqui!</h5>'
    });
    this.popup.open(this.map, this.myPos);
    google.maps.event.addListener(this.myPos, 'click', () => {
      this.popup.open(this.map, this.myPos);
    })
  }
  addBusMarker(position) {
    let busMarker = new SlidingMarker({
      map: this.map,
      position: position,
      animation: google.maps.Animation.DROP,
      icon: 'https://i.imgur.com/6Lo4UGC.png'
    });
    busMarker.setDuration(1000);
    busMarker.setEasing('linear');
    this.busMarker.push(busMarker);
  }

  updateBusMarker(position) {
    for (var i = 0; i < this.busMarker.length; i++) {
      this.busMarker[i].setPosition(position);
      return;
    }
    this.addBusMarker(position);
  }

}
