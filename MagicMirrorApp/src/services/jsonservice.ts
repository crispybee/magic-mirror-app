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

interface TrafficInformation {
    trafficPosition: string,
    trafficStart: string,
    trafficDestination: string,
    trafficZoom: string
}

interface WeatherInformation {
  weatherLocation: string
}

export interface Tile {
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

export class JsonService {

    readonly jsonForDesktop: any = {
        "one": [],
        "two": [],
        "three": []
    };

    readonly basicRow: any = {
        "row": 1,
        "left": { },
        "middle": { },
        "right": { }
    }

    readonly jsonForDashButtons: any = {
        "dashbuttons": [
        ]
    };

    readonly jsonForDashButtonsActive: any = {
        "active": [ ]
    };

    readonly jsonForTraffic: any = {
        "center": {
            "lat": 49.2488637,
            "lng": 8.8884905
        },
        "zoom": 10
    };

    readonly jsonForWifi: any = {};

static instance:JsonService;
    static isCreating:Boolean = false;

    constructor() {
        if (!JsonService.isCreating) {
            throw new Error("You can't call new in Singleton instances! Call JsonService.getInstance() instead.");
        }
    }

    static getInstance() {
        if (JsonService.instance == null) {
            JsonService.isCreating = true;
            JsonService.instance = new JsonService();
            JsonService.isCreating = false;
        }

        return JsonService.instance;
    }

    createRow(firstTile: Tile, secondTile: Tile, thirdTile?: Tile) {
        // if(thirdTile) {
        if(typeof thirdTile !== 'undefined') {
            // TODO: add 3 tiles
        } else {
            // TODO: add 2 tiles
        }
    }

    // TODO: Shouldn't row be grid?
    createRowsForDesktop(desktopNumber: number, row: any) {
        switch(desktopNumber) {
            case 1:
                this.jsonForDesktop.one.push(row);
                break;
            case 2:
                this.jsonForDesktop.two.push(row);
                break;
            case 3:
                this.jsonForDesktop.three.push(row);
                break;
        }

        console.log(this.jsonForDesktop);
    }

    createDashButton(button: any) {
        let dashJSON: any = this.jsonForDashButtons;
        dashJSON.dashbuttons.push(button);
        console.log(dashJSON);
        // return dashJSON;
    }

    createDashButtonActive(activeButton: any) {
        let activeDashJSON: any = this.jsonForDashButtonsActive;
        activeDashJSON.active.push(activeButton);
        console.log(this.jsonForDashButtonsActive);
        // return activeDashJSON;
    }

    createTraffic(traffic: any) {
        let trafficJSON: any = this.jsonForTraffic;
        trafficJSON = traffic;
        console.log(trafficJSON);
        // return trafficJSON;
    }

    createWifi(wifiConfiguration: any) {
        let wifiJSON: any = this.jsonForWifi;
        wifiJSON = wifiConfiguration;
        console.log(wifiJSON);
        // return wifiJSON;
    }
}