import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { JsonService } from "../../services/jsonservice";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  mac1: any = {};
  mac2: any = {};
  mac3: any = {};
  message1: any = {};
  message2: any = {};
  message3: any = {};
  ssid: any = {};
  password: any = {};
  //items: Array<{ adress: string, message: string }> = [];
  public numberOfDashButtons: number = 0;
  constructor(public navCtrl: NavController) {
  }


  save() {
    /*   {"mac":"34:gr:34:65:g6", "text":"bla"},*/
    let mac1: string = this.mac1.mac;
    let message1: string = this.message1.message;
    let mac2: string = this.mac2.mac;
    let message2: string = this.message1.message;
    let mac3: string = this.mac3.mac;
    let message3: string = this.message3.message;

    JsonService.getInstance().createDashButton({ "mac": mac1, "text": message1 });
    JsonService.getInstance().createDashButton({ "mac": mac2, "text": message2 });
    JsonService.getInstance().createDashButton({ "mac": mac3, "text": message3 });
  }

  saveWifiSettings() {
    let ssid: string = this.ssid.ssid;
    let password: string = this.password.password;
    JsonService.getInstance().createWifi({ "ssid": ssid, "password": password });
  }


  add() {

    /* this.numberOfDashButtons++;
     this.items.push({
       adress: 'MAC' + this.numberOfDashButtons,
       message: 'Message ' + this.numberOfDashButtons,
     });*/
  }

}
