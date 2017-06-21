import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { SettingsPage } from '../pages/settings/settings';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BLE } from '@ionic-native/ble'
import { GoogleMaps } from '@ionic-native/google-maps';
import { MirrorSurfacePage } from "../pages/mirror-surface/mirror-surface";
import { PackeryGridComponent } from "../components/packery-grid/packery-grid";
import { MapsComponent } from "../components/maps-component/maps-component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    BluetoothPage,
    SettingsPage,
    MirrorSurfacePage,
    PackeryGridComponent,
    MapsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    BluetoothPage,
    SettingsPage,
    MirrorSurfacePage,
    MapsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    Geolocation,
    GoogleMaps,
    FormsModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
