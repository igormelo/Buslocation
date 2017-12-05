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
  public busMarker: Array<google.maps.Marker>;

  constructor(public busService: BusService) {
    this.busMarker = []
  }
  ngOnInit() {
    this.fetchAndRefresh();
  }

  addBusMarker(bus) {
    let busMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(bus.coord.lat, bus.coord.lng),
      icon:'https://i.imgur.com/6Lo4UGC.png'
    });
    busMarker.setDuration(2000);
    busMarker.setEasing('linear');
    busMarker.set('id', bus.id);
    this.busMarker.push(busMarker)
  }
  updateBusMarker(bus) {
    for (var i = 0, numOfBus = this.busMarker.length; i < numOfBus; i++) {
      //procura o bus e atualiza
      if ((<any>this.busMarker[i]).id === (<any>bus).id) {
        this.busMarker[i].setPosition(new google.maps.LatLng(bus.coord.lat, bus.coord.lng));
        return;
      }

    }
    this.addBusMarker(bus);
  }
  fetchAndRefresh() {
    this.busService.getBus(9, 9)
      .subscribe(busData => {
      //(<any>busData).buses.forEach(bus => {
          this.updateBusMarker(busData[0]);
        //});
      })
  }
  removeBusMarker() {
    let numOfbus = this.busMarker.length;
    while (numOfbus--) {
      let bus = this.busMarker.pop();
      bus.setMap(null);
    }
  }

}
