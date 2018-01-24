import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { MylocationComponent } from '../mylocation/mylocation';
import { Observable } from 'rxjs/Observable';
import { GoogleMaps } from '@ionic-native/google-maps';
import { } from '@types/googlemaps';
import { BuslocationComponent } from '../buslocation/buslocation';


declare var google: any;
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
  start: any;
  end: any;
  public map: google.maps.Map;
  public mapIdle: boolean;
  public loc: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public geolocation: Geolocation, public afAuth: AngularFireAuth) {

  }
  ngOnInit() {
    this.map = this.createMap(this.loc);
    this.addMapEventListener();
    this.getCurrentLocation().subscribe(location => {
      //this.map.panTo(location);
      console.log(location);
      this.centerLocation(location);

    })
    this.calculateAndDisplayRoute();

  }

  addMapEventListener() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.mapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.mapIdle = true;
    })
  }

  getCurrentLocation(): Observable<google.maps.LatLng> {
    let loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loading.present();

    let locationOptions = { timeout: 20000, enableHighAccuracy: true };
    let Obs = Observable.create(observable => {
      this.geolocation.getCurrentPosition(locationOptions)
        .then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          let location = new google.maps.LatLng(lat, lng);
          this.map = this.createMap(location);
          loading.dismiss();

        }, (err) => {
          console.log("Geolocation error:" + err);
          loading.dismiss();
        })
    })
    return Obs;
  }

  createMap(location) {
    var style = [];
    var styledMap = [
      {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#d665d2"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
    let options = {
      center: location,
      zoom: 16,
      //styles: styledMap,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let mapElement = document.getElementById("map_canvas");
    let map = new google.maps.Map(mapElement, options);
    this.directionsDisplay.setMap(map);
    return map;
  }

  centerLocation(location) {
    if (location) {
      this.map.panTo(location);
    } else {
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      });
    }
  }
  isNight() {
    let time = new Date().getHours();
    return (time > 5 && time < 19) ? false : true;
  }
  calculateAndDisplayRoute() {
    //this.start = 'rio de janeiro, rj';
    //this.end = 'nova iguaçu, rj';
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'TRANSIT'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log("error" + status);
      }
    });
  }


}
