import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { MapsComponent } from "../maps-component/maps-component";
import { NavController } from "ionic-angular";
import { JsonService, BasicTile, Tile } from "../../services/jsonservice";

import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';


@Component({
  selector: 'packery-grid',
  templateUrl: 'packery-grid.html'
})
export class PackeryGridComponent implements AfterViewInit {

  @Input() mirrorNumber: any;
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
      var gridMirrorNumber = this.mirrorNumber;

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
        addNewTile(tileGrid, false, 'small');
      });

      // Button can not be used from Angular, therefore use plain access
      this.addBigTileButton.nativeElement.addEventListener('click', function() {
        addNewTile(tileGrid, true, 'big');
      });

      var packery = new Packery(tileGrid, packeryOptions);

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
          // console.log(itemElem);
        });
      }

      orderItems();

      function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function addNewTile(nativeElementVar, double: boolean, tileTypeText: string) {
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
          orderItems();

          item.textContent = capitalizeFirstLetter(tileTypeText);
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
        console.log('Current mirror number', gridMirrorNumber);
        var tileData = JsonService.getInstance().getRowsOfDesktop(gridMirrorNumber);

        tileData.forEach(tile => {
          addNewTile(tileGrid, tile.doubleTile, tile.type);
        })
      }

      JSONtoTiles();

      packery.on('dragItemPositioned', function(draggedItem) {

        // timeout fixes most packery bugs
        setTimeout(function() {
          packery.layout();
          orderItems();
        }, 300);
      });
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

    return allGridTiles;
  }

  callTilesToJSON() {
    this.tilesToJSON(this.getTilePosition());
  }

  private tilesToJSON(gridTiles: Element[]) {

        var firstRow: any = {};
        var secondRow: any = {};
        var thirdRow: any = {};

        var rowCount = 1;
        var rowTileSpaceCount = 0;

        var tilesInRow: Tile[] = [];

          gridTiles.forEach(function(tile: Element) {
            if(tile.classList.contains('grid-item--width2')) {
              rowTileSpaceCount += 2;
              tilesInRow.push(new BasicTile(tile.textContent, true));
            } else {
              rowTileSpaceCount++;
              tilesInRow.push(new BasicTile(tile.textContent, false));
            }

            if(rowTileSpaceCount === 3) {
              rowTileSpaceCount = 0;

              switch(rowCount) {
                case 1:
                  if(tilesInRow.length === 3) {
                    firstRow = JsonService.getInstance().createRow(1, tilesInRow[0], tilesInRow[1], tilesInRow[2]);
                  } else if (tilesInRow.length === 2) {
                    firstRow = JsonService.getInstance().createRow(1, tilesInRow[0], tilesInRow[1]);
                  }
                  rowCount = 2;
                  tilesInRow = [];
                break;
                case 2:
                  if(tilesInRow.length === 3) {
                    secondRow = JsonService.getInstance().createRow(2, tilesInRow[0], tilesInRow[1], tilesInRow[2]);
                  } else if (tilesInRow.length === 2) {
                    secondRow = JsonService.getInstance().createRow(2, tilesInRow[0], tilesInRow[1]);
                  }
                  rowCount = 3;
                  tilesInRow = [];
                break;
                case 3:
                  if(tilesInRow.length === 3) {
                    thirdRow = JsonService.getInstance().createRow(3, tilesInRow[0], tilesInRow[1], tilesInRow[2]);
                  } else if (tilesInRow.length === 2) {
                    thirdRow = JsonService.getInstance().createRow(3, tilesInRow[0], tilesInRow[1]);
                  }
                  tilesInRow = [];
                break;
              }
            } else if (rowTileSpaceCount > 3) {

              // 2 big tiles in a row -> error
              return false;
            }
         });

         console.log('Mirror number is', this.mirrorNumber);
         console.log('row1', firstRow);
         console.log('row2', secondRow);
         console.log('row3', thirdRow);
         JsonService.getInstance().createGridForDesktop(this.mirrorNumber, firstRow, secondRow, thirdRow);
      }

  constructor(private navController: NavController, private parentElement: ElementRef) {
    this.statusText = 'Grid state info';
  }
}
