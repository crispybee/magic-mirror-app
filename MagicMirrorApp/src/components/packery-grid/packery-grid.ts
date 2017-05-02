import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';


@Component({
  selector: 'packery-grid',
  templateUrl: 'packery-grid.html'
})
export class PackeryGridComponent implements AfterViewInit {

  @ViewChild('packeryGrid') grid: ElementRef;
  statusText: string;

  doSomething(event) {
    // event.target.classList.toggle('grid-item--width2');
    // this.packery.layout();
  }

  ngAfterViewInit() {
      console.log(this.grid.nativeElement);

      var packeryOptions = {
        itemSelector: '.grid-item',
        // TODO: Remove rowHeight and columnWidth eventually
        columnWidth: 100,
        rowHeight: 100,
        originLeft: true,
        originTop: true,
        resize: false
      }

      var packery = new Packery(this.grid.nativeElement, packeryOptions);

      packery.getItemElements().forEach(function(itemElem) {
        var draggedElement = new Draggabilly(itemElem);
        // TODO: packery must be local
        packery.bindDraggabillyEvents(draggedElement);
      });

      packery.on('dragItemPositioned', function(draggedItem) {
        packery.layout();
      });
    }

  constructor() {
    this.statusText = 'Grid state info';
  }

}
