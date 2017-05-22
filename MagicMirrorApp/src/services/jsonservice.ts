import { TileType } from "../components/packery-grid-item/packery-grid-item";

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

    jsonForDesktop: any = {
        "one": [],
        "two": [],
        "three": []
    };

    basicRow: any = {
        "row": 1,
        "left": { },
        "middle": { },
        "right": { }
    }

    jsonForDashButtons: any = {
        "dashbuttons": [
        ]
    };

    jsonForDashButtonsActive: any = {
        "active": [ ]
    };

    jsonForTraffic: any = {
        "center": {
            "lat": 49.2488637,
            "lng": 8.8884905
        },
        "zoom": 10
    };

    jsonForWifi: any = {};

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

    addRowsForDesktop(desktopNumber: number, row: any) {
        if (desktopNumber === 1) {
            this.jsonForDesktop.one.push(row);
        }
        if (desktopNumber === 2) {
            this.jsonForDesktop.two.push(row);
        }
        if (desktopNumber === 3) {
            this.jsonForDesktop.three.push(row);
        }
        console.log(this.jsonForDesktop);
    }

    addDashButton(button: any) {
        this.jsonForDashButtons.dashbuttons.push(button);
        console.log(this.jsonForDashButtons);
    }

    addDashButtonActive(activeButton: any) {
        this.jsonForDashButtonsActive.active.push(activeButton);
        console.log(this.jsonForDashButtonsActive);
    }

    addTraffic(traffic: any) {
        this.jsonForTraffic = traffic;
        console.log(this.jsonForTraffic);
    }

    addWifi(wifiConfiguration: any) {
        this.jsonForWifi = wifiConfiguration;
        console.log(this.jsonForWifi);
    }
}