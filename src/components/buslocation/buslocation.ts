import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BusService } from './../../providers/bus/bus';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as SlidingMarker from 'marker-animate-unobtrusive';
import * as firebase from 'firebase/app';

/**
 * Generated class for the BuslocationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var google: any;
@Component({
  selector: 'buslocation',
  templateUrl: 'buslocation.html',
  providers: [BusService]
})
export class BuslocationComponent implements OnInit {
  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  public busMarker: Array<google.maps.Marker>;
  res: any = {};
  lat: number;
  lng: number;
  private popup: google.maps.InfoWindow;
  private myPos: google.maps.Marker;
  public polyline: google.maps.Polyline;
  constructor(private af: AngularFireDatabase, private busService: BusService) {
    this.busMarker = [];
  }
  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        this.addMyPosition(position);
      });
    }
    this.init();
  }
  ngOnChanges() {
  }

  addBusMarker(bus) {
    let busMarker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(bus.lat, bus.lng),
      icon: 'https://i.imgur.com/6Lo4UGC.png'
    });
  }
  removeBusMarkers() {
    let numOfCars = this.busMarker.length;
    while (numOfCars--) {
      let buses = this.busMarker.pop();
      buses.setMap(null);
    }
  }

  init() {
    this.busService.getBus().subscribe(snap => {
      snap.forEach(data => {
        this.addBusMarker(data);
        this.showDirection(data);
      })
    });
  }
  showDirection(path) {
    this.polyline = new google.maps.Polyline({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3
    });
    this.polyline.setMap(this.map);
  }

  addMyPosition(position) {
    this.myPos = new google.maps.Marker({
      map: this.map,
      position: this.map.getCenter()
    });
    this.showPickupTime();
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

}
