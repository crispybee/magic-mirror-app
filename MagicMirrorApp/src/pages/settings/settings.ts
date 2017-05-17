import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { JsonService } from "../../services/jsonservice";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  items: Array<{ adress: string, message: string }> = [];
  public numberOfDashButtons: number = 0;
  constructor(public navCtrl: NavController) {
    // testing
    JsonService.getInstance().addRowsForDesktop(1, {
      "row": 3,
      "left": { "grid": "traffic", "wide": true },
      "middle": { "grid": "empty", "wide": false },
      "right": { "grid": "weather" }
    }
    );
  }

  save() {
  }

  add() {

    this.numberOfDashButtons++;
    this.items.push({
      adress: 'MAC' + this.numberOfDashButtons,
      message: 'Message ' + this.numberOfDashButtons,
    });
  }

}
