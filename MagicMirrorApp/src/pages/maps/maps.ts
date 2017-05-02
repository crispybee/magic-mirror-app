import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapPage {


  map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform,private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap(){

    let location = new LatLng(-34.9290,138.6010);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });
    this.map.setCenter(location);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });

  }
}
