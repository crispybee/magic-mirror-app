import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IGridsterOptions, IGridsterDraggableOptions, GridsterComponent } from "angular2gridster/dist";

@Component({
  selector: 'page-gridconfiguration',
  templateUrl: 'gridconfiguration.html'
})
export class GridConfigurationPage {
  gridsterOptions: IGridsterOptions = {
    lanes: 3,
    direction: 'vertical',
    dragAndDrop: true
  };

  gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: 'panel-heading'
  };

  title = 'Angular2Gridster';
  widgets: Array<any> = [
    {
      x: 0, y: 0, w: 1, h: 1,
      title: 'Karte 1',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      x: 1, y: 0, w: 1, h: 1,
      title: 'Karte 2',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      x: 2, y: 0, w: 1, h: 1,
      title: 'Karte 3',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      x: 0, y: 1, w: 1, h: 1,
      title: 'Karte 4',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      x: 1, y: 1, w: 1, h: 1,
      title: 'Karte 5',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      x: 2, y: 1, w: 1, h: 1,
      title: 'Karte 6',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      x: 0, y: 2, w: 1, h: 1,
      title: 'Karte 7',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      x: 1, y: 2, w: 2, h: 1,
      title: 'Karte 8',
      content: 'Lorem ipsum dolor sit amet.'
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  logChanges (items: any) {
    console.log('Changed items: ', items);
  }

}
