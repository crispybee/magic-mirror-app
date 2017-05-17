import { Component, Input } from '@angular/core';

// TODO: No provider for Number, is the error here?
export enum TileType {
  Time,
  Dashbutton,
  Quote,
  Quiz,
  Empty,
  Joke,
  Traffic,
  Weather
}


@Component({
  selector: 'packery-grid-item',
  templateUrl: 'packery-grid-item.html'
})
export class PackeryGridItemComponent {
  @Input() mirrorDisplay: string = '';

  type: TileType;

  constructor(/*tileType: TileType*/) {
    console.log("MI:", this.mirrorDisplay);

    // this.type = tileType;

    switch(this.type)
    {
      case TileType.Time:
        console.log("Time");
        break;
      case TileType.Dashbutton:
        console.log("Dashbutton");
        break;
      case TileType.Quote:
        console.log("Quote");
        break;
      case TileType.Quiz:
        console.log("Quiz");
        break;
      case TileType.Empty:
        console.log("Empty");
        break;
      case TileType.Joke:
        console.log("Joke");
        break;
      case TileType.Traffic:
        console.log("Traffic");
        break;
      case TileType.Weather:
        console.log("Weather");
        break;
    }
  }

}
