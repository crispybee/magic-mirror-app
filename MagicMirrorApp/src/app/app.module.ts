import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import {SettingsPage} from '../pages/settings/settings';
import {MapPage} from '../pages/maps/maps';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Geolocation} from '@ionic-native/geolocation';
import { BLE } from '@ionic-native/ble'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { MirrorSurfacePage } from "../pages/mirror-surface/mirror-surface";
import { PackeryGridComponent } from "../components/packery-grid/packery-grid";
import { PackeryGridItemComponent } from "../components/packery-grid-item/packery-grid-item";
import { MapsComponent } from "../components/maps-component/maps-component";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BluetoothPage,
    SettingsPage,
    MapPage,
    MirrorSurfacePage,
    PackeryGridComponent,
    PackeryGridItemComponent,
    MapsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BluetoothPage,
    SettingsPage,
    MapPage,
    MirrorSurfacePage,
    MapsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
