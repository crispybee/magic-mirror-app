import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  items: Array<{ adress: string, message: string }> = [];
  numberOfDashButtons: number = 0;
  constructor(public navCtrl: NavController) {
  }

  save() {

  }

  add() {
    this.numberOfDashButtons++;
    this.items.push({
      adress: 'MAC Adress' + this.numberOfDashButtons,
      message: 'Message ' + this.numberOfDashButtons,
    });

  }

}
