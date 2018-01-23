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
  @Input() map: google.maps.Map;
  public busMarker: Array<google.maps.Marker>;
  res: any = {};
  lat: number;
  lng: number;
  motorista: Array<any>;
  @Input() end: any;
  constructor(private af: AngularFireDatabase, private busService: BusService) {
    this.busMarker = [];
  }
  ngOnInit() {
    this.end = 'nova iguaçu, rj';
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
    //this.end = new google.maps.LatLng(parseFloat(bus.lat), parseFloat(bus.lng));
  }
  removeBusMarkers() {
    let numOfCars = this.busMarker.length;
    while (numOfCars--) {
      let buses = this.busMarker.pop();
      buses.setMap(null);
    }
  }

  init() {
    this.af.list("Igor Melo").valueChanges().subscribe(snap => {
      snap.forEach(data => {
        this.addBusMarker(data);
      })
    })
  }

}
