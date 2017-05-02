import {Component} from '@angular/core';
import { Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { BLE } from '@ionic-native/ble';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, ble: BLE, private modalCtrl: ModalController, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      ble.enable().then(enable => {
        console.log(enable);
        this.openModal();
      }).catch(error => {
        console.log(error);
        this.showAlert();
      });
    });
  }

  openModal() {
      let modal = this.modalCtrl.create(BluetoothPage);
      modal.present();
  }

  showAlert() {
      let alert = this.alertCtrl.create({
        title: "Enable Bluetooth",
        subTitle: "Please enable Bluetooth on your phone to connect to the Magic Mirror.",
        buttons: ["OK"]
    });

    alert.present();
  }
}
