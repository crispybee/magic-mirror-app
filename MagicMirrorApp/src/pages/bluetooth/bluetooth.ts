import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html'
})
export class BluetoothPage {

  constructor(public platform: Platform, public params: NavParams, public viewController: ViewController) { }

  dismiss() {
    this.viewController.dismiss();
  }
}