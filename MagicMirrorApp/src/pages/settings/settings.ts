import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { JsonService } from "../../services/jsonservice";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {
  ssid: any = {};
  password: any = {};
  items: Array<{ macTitle: string, messageTitle: string, mac: string, text: string }> = [];
  public numberOfDashButtons: number = 0;

  constructor(public navCtrl: NavController, public loadingController: LoadingController) {
  }


  save() {
    // Reset dashbutton array
    JsonService.getInstance().jsonForDashButtons.dashbuttons = [];
    /*   {"mac":"34:gr:34:65:g6", "text":"bla"},*/
    for (let item of this.items) {
      JsonService.getInstance().createDashButton({ "mac": item.mac, "text": item.text });
    }

    let loading = this.loadingController.create({
      spinner: 'dots',
      content: 'Please wait until Dashbutton data is sent to the Magic Mirror...'
    });

    loading.present();

    let dashbuttonData: ArrayBuffer[] = JsonService.getInstance().sliceStringToChunks(JSON.stringify(JsonService.getInstance().jsonForDashButtons), "dasbuttons_config");
    JsonService.getInstance().sendData(dashbuttonData).then(answer => {
      loading.dismiss();
    });
  }

  saveWifiSettings() {
    let ssid: string = this.ssid.ssid;
    let password: string = this.password.password;
    JsonService.getInstance().createWifi({ "ssid": ssid, "password": password });

    let loading = this.loadingController.create({
      spinner: 'dots',
      content: 'Please wait until Wi-Fi data is sent to the Magic Mirror...'
    });

    loading.present();

    let wifiData: ArrayBuffer[] = JsonService.getInstance().sliceStringToChunks(JSON.stringify(JsonService.getInstance().jsonForWifi), "wifi_config");
    JsonService.getInstance().sendData(wifiData).then(answer => {
      loading.dismiss();
    });
  }


  add() {
    this.numberOfDashButtons++;
    this.items.push({
      macTitle: 'MAC ' + this.numberOfDashButtons,
      messageTitle: 'Message ' + this.numberOfDashButtons,
      mac: '',
      text: '',
    });
  }

  delete() {
    this.items.pop();
    this.numberOfDashButtons--;
  }

}
