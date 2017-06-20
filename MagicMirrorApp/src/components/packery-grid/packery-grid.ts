import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { MapsComponent } from "../maps-component/maps-component";
import { NavController, LoadingController } from "ionic-angular";
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

  tiles: Tile[] = [];

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
        resize: false,
        transitionDuration: '0.2s'
      }

      let observer = new MutationObserver(mutations => {
        mutations.forEach(function(mutation) {
          let item: HTMLElement = <HTMLElement>mutation.target;
          let itemTileType: string = item.textContent;

          if(item.getAttribute("changesizeto") === "small") {

            // delete item and add 2 new small ones
            packery.remove(item);
            setTimeout(function() {
              addNewTile(tileGrid, false, itemTileType);
              addNewTile(tileGrid, false, 'empty');

              // timeout fixes most packery bugs
              setTimeout(function() {
                packery.layout();
                setTimeout(function() {
                  orderItems();
                }, 500);
              }, 1000);
            }, 500);

          } else if (item.getAttribute("changesizeto") === "big") {
            // remove item and remove another small grid item and add a big new one
            packery.remove(item);

            packery.getItemElements().every(function(itemElem, index) {
              if(!itemElem.classList.contains('grid-item--width2')) {
                packery.remove(itemElem);
                return false;
              } else {
                return true;
              }
            });

            setTimeout(function() {
              addNewTile(tileGrid, true, itemTileType);

              setTimeout(function() {
                packery.layout();
                setTimeout(function() {
                  orderItems();
                }, 500);
              }, 1000);
            }, 500);
          }
        });
      });

      let config = {attributes: true, childList: false, characterData: false, subtree: true, attributeFilter: ["changesizeto"]};
      observer.observe(tileGrid, config);

      var packery = new Packery(tileGrid, packeryOptions);

      function makeAllItemsDraggable() {
        packery.getItemElements().forEach(function(itemElem) {
          var draggedElement = new Draggabilly(itemElem);
          // packery must be local
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
          var item: HTMLElement = document.createElement('div');
          item.className = 'grid-item';

          if(double) {
            item.className += ' grid-item--width2';

            // add size changing attribute
            item.setAttribute("changesizeto", "noneSmall");
          } else {
            item.setAttribute("changesizeto", "noneBig");
          }

          var fragment = document.createDocumentFragment();
          fragment.appendChild(item);

          nativeElementVar.appendChild(fragment);
          packery.appended(item);
          makeAllItemsDraggable();
          orderItems();

          item.textContent = capitalizeFirstLetter(tileTypeText);

          // add events for browser and touchscreen
          item.addEventListener('touchend', function() {
            markTile(item);
          });
          item.addEventListener('click', function() {
            markTile(item);
          });
        }

        function markTile(item: HTMLElement) {
            packery.getItemElements().forEach(function(itemElem, position) {
              if(itemElem.classList.contains('grid-item--width2')) {
                itemElem.className = 'grid-item grid-item--width2';
                itemElem.style.background = '#09C';
              } else {
                itemElem.className = 'grid-item';
                itemElem.style.background = '#09C';
              }
            });

            if(!item.classList.contains('marked')) {
              item.className += ' marked';
            }

            item.style.background = '#C90';
          }

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

  openMaps() {
    this.navController.push(MapsComponent);
  }

  getTilePosition(): Element[] {
    let element: HTMLElement = this.parentElement.nativeElement;
    let allGridTiles: Element[] = [].slice.call(element.getElementsByClassName('grid-item'));

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

  tileNumberChecker(): boolean {
        var allTiles = this.getTilePosition();
        var numberOfSmallTiles: number = 0;
        var numberOfBigTiles: number = 0;

        console.log("Number of current tiles", allTiles.length);

        allTiles.forEach(function(tile: Element) {
          if(tile.classList.contains('grid-item--width2')) {
            numberOfBigTiles++;
          } else {
            numberOfSmallTiles++;
          }
        });

        if(numberOfBigTiles >= 3) {
          return false;
        } else {
          return true;
        }
      }

  toggleTileSize() {
    let markedTiles: HTMLElement[] = this.grid.nativeElement.getElementsByClassName('marked');

    if(markedTiles.length !== 0) {
      let markedTile: HTMLElement = markedTiles[0];
      console.log("Toggle marked tile", markedTile);

      if(markedTile.getAttribute('changesizeto') === 'noneSmall') {
        markedTile.setAttribute('changesizeto', 'small');
      } else if(markedTile.getAttribute('changesizeto') === 'noneBig' && this.tileNumberChecker()) {
        markedTile.setAttribute('changesizeto', 'big');
      }
    }
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
              tilesInRow.push(new BasicTile(tile.textContent.toLowerCase(), true));
            } else {
              rowTileSpaceCount++;
              tilesInRow.push(new BasicTile(tile.textContent.toLowerCase(), false));
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
         JsonService.getInstance().createGridForDesktop(this.mirrorNumber, firstRow, secondRow, thirdRow);
      }

  saveAndSendGrids() {
    this.callTilesToJSON();

    let mirrorData: ArrayBuffer[] = JsonService.getInstance().sliceStringToChunks(JSON.stringify(JsonService.getInstance().jsonForDesktop), "desktop_config");

    let loading = this.loadingController.create({
      spinner: 'dots',
      content: 'Please wait until grid data is sent to the Magic Mirror...'
    });

    loading.present();

    JsonService.getInstance().sendData(mirrorData).then(answer => {
      // Remove loading controller when data has been sent
      loading.dismiss();
    });
  }

  changeTileType() {
    // TODO:
    console.log("Change tile type");
  }

  constructor(private navController: NavController, private parentElement: ElementRef, public loadingController: LoadingController) {
  }
}
