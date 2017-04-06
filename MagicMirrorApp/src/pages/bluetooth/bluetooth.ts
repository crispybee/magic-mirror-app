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

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    this.scanBluetoothDevices();
    }, 500);
  }

  connectToDevice(deviceId) {
    this.ble.connect(deviceId).subscribe(connection => {
      console.log(connection);
      this.dismiss();
    }, error => {
      console.log("Connection error:", error);
    });

    console.log(deviceId);
  }

  disconnectDevice() {
    this.ble.disconnect("6c:b8:87:ae:ec:c6").then(answer => {
      console.log(answer);
    }).catch(error => {
      console.log(error);
    });
  }

  dismiss() {
    this.ble.stopScan();
    this.viewController.dismiss();
  }
}