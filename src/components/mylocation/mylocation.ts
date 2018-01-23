import * as SlidingMarker from 'marker-animate-unobtrusive';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BusService } from '../../providers/bus/bus';
declare var google: any;
@Component({
  selector: 'mylocation',
  templateUrl: 'mylocation.html',
  providers: [BusService]
})
export class MylocationComponent implements OnInit, OnChanges {
  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  @Input() start: any;
  private popup: google.maps.InfoWindow;
  private pickupMarker: SlidingMarker;

  constructor() {
  }
  ngOnInit() {
  }
  ngOnChanges(changes) {
    if (this.isPinSet) {
      this.showPickupMarker();
    } else {
      this.removePickupMarker();
    }
  }
  showPickupMarker() {
    this.pickupMarker = new SlidingMarker({
      map: this.map,
      position: this.map.getCenter()
    });
    this.start = 'rio de janeiro, rj';
    /*setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    }, 300);*/
    this.showPickupTime();
  }
  removePickupMarker() {
    if (this.pickupMarker) {
      this.pickupMarker.setDuration(1000);
      this.pickupMarker.setEasing('linear');
      this.pickupMarker.setMap(null);
    }

  }
  showPickupTime() {
    this.popup = new google.maps.InfoWindow({
      content: '<h5>Voce esta aqui!</h5>'
    });
    this.popup.open(this.map, this.pickupMarker);
    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    })
  }


}
