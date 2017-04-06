import { Component } from '@angular/core';
import { BluetoothPage } from '../bluetooth/bluetooth';

import { ModalController, NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public modalCtrl: ModalController, public navCtrl: NavController) { }

  openModal() {
      let modal = this.modalCtrl.create(BluetoothPage);
      modal.present();
  }
}
