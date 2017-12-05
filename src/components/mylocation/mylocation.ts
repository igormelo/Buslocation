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
  private popup: google.maps.InfoWindow;
  private pickupMarker: google.maps.Marker;

  constructor() {
  }
  ngOnInit() {
    console.log("iniciou");
  }
  ngOnChanges(changes) {
    if (this.isPinSet) {
      this.showPickupMarker();
    } else {
      this.removePickupMarker();
    }
  }
  showPickupMarker() {
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      icon:'https://i.imgur.com/HRvHmLT.png'
    })
    setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    }, 300);
    this.showPickupTime();
  }
  removePickupMarker() {
    if (this.pickupMarker) {
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
