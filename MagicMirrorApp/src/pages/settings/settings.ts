import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController) {
  }


  save() {
    /*   {"mac":"34:gr:34:65:g6", "text":"bla"},*/
    for (let item of this.items) {
      JsonService.getInstance().createDashButton({ "mac": item.mac, "text": item.text });
    }
  }

  saveWifiSettings() {
    let ssid: string = this.ssid.ssid;
    let password: string = this.password.password;
    JsonService.getInstance().createWifi({ "ssid": ssid, "password": password });
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
