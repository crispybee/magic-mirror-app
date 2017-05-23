import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MapsComponent } from "../maps-component/maps-component";
import { NavController } from "ionic-angular";
import { JsonService, BasicTile, Tile, TileType } from "../../services/jsonservice";

import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';


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
    this.tiles.push(new BasicTile("empty", false));
  }

  ngAfterViewInit() {
      console.log(this.grid.nativeElement);
      var tileGrid = this.grid.nativeElement;

      // TODO: Get the JSON data and pass it in here

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
          itemElem.id = position;
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
          orderItems();

/*
          item.addEventListener('click', function() {
            // TODO: Change color to marked and demark the others & pass item pointer outside of ngAfterViewInit

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
            //updateCurrentMarkedItem(item);
          });
*/
        }
      // }

      function JSONtoTiles() {

      }

      packery.on('dragItemPositioned', function(draggedItem) {
        // timeout fixes most packery bugs
        setTimeout(function() {
          packery.layout();
          orderItems();
        }, 300);

        // TODO: Causes lag
        // makeAllItemsDraggable();
      });

      // packery.on('layoutComplete', orderItems);
    }


  updateCurrentMarkedItem(item) {
        console.log("Marked", item);
        this.currentMarkedTile = new ElementRef(item);
  }

  logItem() {
    console.log("currentMarkedTile", this.currentMarkedTile);
  }

  openMaps() {
    this.navController.push(MapsComponent);
  }

  getTilePosition(): Element[] {
    let element: HTMLElement = this.parentElement.nativeElement;

    var allGridTiles: Element[] = [].slice.call(element.getElementsByClassName('grid-item'));

    console.log('Not sorted:', allGridTiles);

    // sort tiles by position
    allGridTiles.sort(function(a, b) {
      if(a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }

      return 0;
    });

    console.log('Sorted:', allGridTiles);

    return allGridTiles;
  }

  tilesToJSON(gridTiles: Element[]) {
        // grid-item--width2
        var firstRow = {};
        var secondRow = {};
        var thirdRow = {};

        var rowCount = 1;
        var tilesInRow: Element[] = [];

        // packery.getItemElements().forEach(function(itemElem, position) {
          gridTiles.forEach(function(tile: Element) {
          var rowTileSpaceCount = 0;
            if(tile.classList.contains('grid-item--width2')) {
              rowTileSpaceCount += 2;
              tilesInRow.push(tile);
            } else {
              rowTileSpaceCount++;
              tilesInRow.push(tile);
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

  constructor(private navController: NavController, private parentElement: ElementRef) {
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
