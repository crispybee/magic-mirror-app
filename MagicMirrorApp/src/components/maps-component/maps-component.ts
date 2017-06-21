import { Component, AfterViewInit } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { JsonService } from "../../services/jsonservice";

@Component({
  selector: 'maps-component',
  templateUrl: 'maps-component.html'
})
export class MapsComponent implements AfterViewInit {

  map: GoogleMap;

  constructor( public platform: Platform, private geolocation: Geolocation, public navController: NavController, public loadingController: LoadingController) {
  }

  loadMap() {

    let location = new LatLng(-34.9290, 138.6010);

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
        'tilt': 0,
        'zoom': 15,
        'bearing': 50
      }
    });
    this.map.setCenter(location);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
        this.loadMap();
    });
  }

  dismiss() {
    this.navController.pop();
  }

  sendMapData() {
    let latLng: LatLng = new LatLng(1, 1);

    this.map.getCameraPosition().then(cameraData => {
      console.log("Get map information", cameraData);
      latLng = <LatLng>cameraData.target;

      JsonService.getInstance().jsonForTraffic.center.lat = latLng.lat;
      JsonService.getInstance().jsonForTraffic.center.lng = latLng.lng;
      JsonService.getInstance().jsonForTraffic.zoom = cameraData.zoom;

      console.log(latLng, cameraData.zoom);
    }).catch(error => {
      console.log(error);
    });

    let mapData: ArrayBuffer[] = JsonService.getInstance().sliceStringToChunks(JSON.stringify(JsonService.getInstance().jsonForTraffic), "traffic_config");

    let loading = this.loadingController.create({
      spinner: 'dots',
      content: 'Please wait until map data is sent to the Magic Mirror...'
    });

    loading.present();

    console.log("Traffic / Map", JsonService.getInstance().jsonForTraffic);

    JsonService.getInstance().sendData(mapData).then(answer => {
      // Remove loading controller when data has been sent
      loading.dismiss();
    });
  }
}
