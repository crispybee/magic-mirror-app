import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

export class BluetoothDevice {
    constructor(public deviceName: string, private macAddress: string) { }
}

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html'
})
export class BluetoothPage {
  scannedBluetoothDevices: BluetoothDevice[] = [];

  constructor(public platform: Platform, public params: NavParams, public viewController: ViewController, private ble: BLE, private ref: ChangeDetectorRef) {
      this.scanBluetoothDevices();
  }

  scanBluetoothDevices() {
      this.ble.startScan([]).subscribe(device => {
      console.log(JSON.stringify(device));
      this.scannedBluetoothDevices.push(new BluetoothDevice(device.name, device.id));

      // Fix for *ngFor bug
      this.ref.detectChanges();
      console.log("scannedBluetoothDevices", this.scannedBluetoothDevices);
      }, error => {
          console.log(error);
      });
  }
    
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.ble.stopScan();
    this.scannedBluetoothDevices = [];
    this.scanBluetoothDevices();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 100);
  }

  dismiss() {
    this.ble.stopScan();
    this.viewController.dismiss();
  }
}