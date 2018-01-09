import { Observable } from 'rxjs/Observable';
import { BusService } from './../../providers/bus/bus';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as SlidingMarker from 'marker-animate-unobtrusive';

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
  public busMarker: google.maps.Marker;

  constructor(public busService: BusService) {
  }
  ngOnInit() {
    this.addBusMarker();
  }

  addBusMarker() {
    this.busMarker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(-22.718175,-43.553750),
      icon:'https://i.imgur.com/6Lo4UGC.png'
    });
  }


}
