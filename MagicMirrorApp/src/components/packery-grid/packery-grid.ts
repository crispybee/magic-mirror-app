import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TileType } from "../packery-grid-item/packery-grid-item";
import { MapsComponent } from "../maps-component/maps-component";
import { NavController } from "ionic-angular";

import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';


interface TrafficInformation {
    trafficPosition: string,
    trafficStart: string,
    trafficDestination: string,
    trafficZoom: string
}

interface WeatherInformation {
  weatherLocation: string
}

interface Tile {
  type: TileType,
  doubleTile: boolean,
  traffic?: TrafficInformation,
  weather?: WeatherInformation
}

export class BasicTile implements Tile {
	constructor(public type: TileType, public doubleTile: boolean) { }
}

export class TrafficTile implements Tile {
	constructor(public type: TileType, public doubleTile: boolean, traffic: TrafficInformation) { }
}

export class WeatherTile implements Tile {
	constructor(public type: TileType, public doubleTile: boolean, weather: WeatherInformation) { }
}

@Component({
  selector: 'packery-grid',
  templateUrl: 'packery-grid.html'
})
export class PackeryGridComponent implements AfterViewInit {

  @ViewChild('packeryGrid') grid: ElementRef;
  @ViewChild('addTileButton') addTileButton: ElementRef;
  @ViewChild('addBigTileButton') addBigTileButton: ElementRef;

  statusText: string;
  tiles: Tile[] = [];
  currentMarkedTile: ElementRef;

  add() {
    this.tiles.push(new BasicTile(TileType.Dashbutton, false));
  }

  ngAfterViewInit() {
      console.log(this.grid.nativeElement);
      var tileGrid = this.grid.nativeElement;

      var packeryOptions = {
        itemSelector: '.grid-item',
        // TODO: Remove rowHeight and columnWidth eventually
        columnWidth: 100,
        rowHeight: 100,
        originLeft: true,
        originTop: true,
        resize: false
      }

      // Button can not be used from Angular, therefore use plain access
      this.addTileButton.nativeElement.addEventListener('click', function() {
        addNewTile(tileGrid, false);
      });

      // Button can not be used from Angular, therefore use plain access
      this.addBigTileButton.nativeElement.addEventListener('click', function() {
        addNewTile(tileGrid, true);
      });

      var packery = new Packery(tileGrid, packeryOptions);

      // TODO: Import and position tiles from JSON before binding to Draggabilly
      // let asd: PackeryGridItemComponent = new PackeryGridItemComponent(TileType.Weather);

      function tileNumberChecker() {
        var items = packery.getItemElements();
        var numberOfTiles = items.length;
        console.log("Number of current tiles", numberOfTiles);

        if(numberOfTiles <= 6 || numberOfTiles >= 9) {
          return false;
        } else {
          return true;
        }
      }

      /*
      function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
      }
      */

      function tilesToJSON() {
        // grid-item--width2
        var firstRow = {};
        var secondRow = {};
        var thirdRow = {};

        var rowCount = 1;

        packery.getItemElements().forEach(function(itemElem, position) {
          var rowTileSpaceCount = 0;
            if(itemElem.classList.contains('grid-item--width2')) {
              rowTileSpaceCount += 2;
            } else {
              rowTileSpaceCount++;
            }

            if(rowTileSpaceCount === 3) {
              // TODO: save to first row
              switch(rowCount) {
                case 1:
                //TODO: Read and save to row 1 to begin
                rowCount = 2;
                break;
                case 2:
                //TODO: Read and save to row 2
                rowCount = 3;
                break;
                case 3:
                //TODO: Read and save to row 3 and end
                break;
              }

              rowTileSpaceCount = 0;
            } else if (rowTileSpaceCount > 3) {
              // 2 big tiles in a row -> error
              return false;
            }
        });
      }

      function makeAllItemsDraggable() {
        packery.getItemElements().forEach(function(itemElem) {
          var draggedElement = new Draggabilly(itemElem);
          // TODO: packery must be local
          packery.bindDraggabillyEvents(draggedElement);
        });
      }

      makeAllItemsDraggable();

      // show item order after layout
      function orderItems() {
        packery.getItemElements().forEach(function(itemElem, position) {
          // itemElem.textContent = position + 1;
          console.log(itemElem);
        });
      }

      orderItems();


      function addNewTile(nativeElementVar, double: boolean) {
        // if(tileNumberChecker()) {
          var item = document.createElement('div');
          item.className = 'grid-item';

          if(double) {
            item.className += ' grid-item--width2';
          }

          var fragment = document.createDocumentFragment();
          fragment.appendChild(item);

          nativeElementVar.appendChild(fragment);
          packery.appended(item);
          makeAllItemsDraggable();
          tileNumberChecker();

          item.addEventListener('click', function(callback, marked: ElementRef = this.currentMarkedTile) {

            // TODO: Change color to marked and demark the others & pass item pointer outside of ngAfterViewInit
            marked = new ElementRef(item);

            packery.getItemElements().forEach(function(itemElem, position) {
              if(itemElem.classList.contains('grid-item--width2')) {
                // TODO: add tileType className
                // itemElem.className = 'grid-item grid-item--width2';
                itemElem.style.background = '#09C';
              } else {
                // TODO: add tileType className
                // itemElem.className = 'grid-item';
                itemElem.style.background = '#09C';
              }
            });

            // TODO: check if there are asynchronous problems
            // item.className += ' marked';
            item.style.background = '#C90';
          })
        }
      // }

      packery.on('dragItemPositioned', function(draggedItem) {
        packery.layout();
        // TODO: Causes lag
        // makeAllItemsDraggable();
      });

      // packery.on('layoutComplete', orderItems);
    }

  openMaps() {
    this.navController.push(MapsComponent);
  }

  constructor(private navController: NavController) {
    this.statusText = 'Grid state info';

    /*
    this.tiles.push(new BasicTile(TileType.Joke, false));
    this.tiles.push(new BasicTile(TileType.Empty, false));
    this.tiles.push(new BasicTile(TileType.Quiz, true));
    this.tiles.push(new TrafficTile(TileType.Traffic, true, {trafficPosition: "1" , trafficStart: "2", trafficDestination: "3", trafficZoom: "4"}));
    this.tiles.push(new BasicTile(TileType.Quiz, false));
    this.tiles.push(new BasicTile(TileType.Quiz, false));
    this.tiles.push(new WeatherTile(TileType.Quiz, true, {weatherLocation: "Heilbronn"}));
    */
  }
}
