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
  type: string,
  doubleTile: boolean,
  traffic?: TrafficInformation,
  weather?: WeatherInformation
}

export class BasicTile implements Tile {
	constructor(public type: string, public doubleTile: boolean) { }
}

export class TrafficTile implements Tile {
	constructor(public type: string, public doubleTile: boolean, traffic: TrafficInformation) { }
}

export class WeatherTile implements Tile {
	constructor(public type: string, public doubleTile: boolean, weather: WeatherInformation) { }
}

export class JsonService {

    private readonly exampleJSON: any = {
    "one": [
        {
            "row": 1,
            "left": { "grid": "time", "wide": true },
            "middle": { "grid": "dashbuttons", "wide": false },
            "right": { "grid": "quote" }
        },
        {
            "row": 2,
            "left": { "grid": "quiz", "wide": false },
            "middle": { "grid": "empty", "wide": true },
            "right": { "grid": "empty" }
        },
        {
            "row": 3,
            "left": { "grid": "traffic", "wide": true },
            "middle": { "grid": "empty", "wide": false },
            "right": { "grid": "weather" }
        }
    ],
    "two": [
        {
            "row": 1,
            "left": { "grid": "time", "wide": false },
            "middle": { "grid": "dashbuttons", "wide": false },
            "right": { "grid": "quote" }
        },
        {
            "row": 2,
            "left": { "grid": "quiz", "wide": false },
            "middle": { "grid": "empty", "wide": false },
            "right": { "grid": "joke" }
        },
        {
            "row": 3,
            "left": { "grid": "traffic", "wide": true },
            "middle": { "grid": "empty", "wide": false },
            "right": { "grid": "weather" }
        }
    ],
    "three":[
        {
            "row": 1,
            "left": { "grid": "time", "wide": false },
            "middle": { "grid": "dashbuttons", "wide": false },
            "right": { "grid": "quote" }
        },
        {
            "row": 2,
            "left": { "grid": "quiz", "wide": false },
            "middle": { "grid": "empty", "wide": false },
            "right": { "grid": "joke" }
        },
        {
            "row": 3,
            "left": { "grid": "traffic", "wide": false },
            "middle": { "grid": "empty", "wide": false },
            "right": { "grid": "weather" }
        }
    ]
}


    private readonly jsonForDesktop: any = {
        "one": [],
        "two": [],
        "three": []
    };

    private readonly basicRow: any = {
        "row": 1,
        "left": { },
        "middle": { },
        "right": { }
    }

    private readonly jsonForDashButtons: any = {
        "dashbuttons": [
        ]
    };

    private readonly jsonForDashButtonsActive: any = {
        "active": [ ]
    };

    private readonly jsonForTraffic: any = {
        "center": {
            "lat": 49.2488637,
            "lng": 8.8884905
        },
        "zoom": 10
    };

    private readonly jsonForWifi: any = {};

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

    createRow(rowNumber: number, firstTile: Tile, secondTile: Tile, thirdTile?: Tile) {

        let row: any = this.basicRow;

        row.row = rowNumber;
        // if(thirdTile) {
        if(typeof thirdTile !== 'undefined') {
            row.right = {"grid": thirdTile.type};
        }

        row.left = {"grid": firstTile.type, "wide": firstTile.doubleTile};
        row.middle = {"grid": secondTile.type, "wide": secondTile.doubleTile};

        return row;
    }

    createGrid(firstRow: any, secondRow: any, thirdRow: any) {
        let gridArray: any[] = [];

        gridArray.push(firstRow);
        gridArray.push(secondRow);
        gridArray.push(thirdRow);

        return  gridArray;
    }

    createGridForDesktop(desktopNumber: number, grid: any[]) {
        switch(desktopNumber) {
            case 1:
                this.jsonForDesktop.one = grid;
                break;
            case 2:
                this.jsonForDesktop.two = grid;
                break;
            case 3:
                this.jsonForDesktop.three = grid;
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

    private readGridFromDesktop(desktopNumber: number) {
        switch(desktopNumber) {
            case 1:
                return this.exampleJSON.one;
            case 2:
                return this.exampleJSON.two;
            case 3:
                return this.exampleJSON.three;
        }
    }

    getRowsOfDesktop(desktopNumber: number) {
        let grid: any = this.readGridFromDesktop(desktopNumber);
        let rowArray: Tile[] = [];

        grid.forEach(row => {
            if(row.left.wide || row.middle.wide) {
                rowArray.push(new BasicTile(row.left.grid, row.left.wide));
                rowArray.push(new BasicTile(row.middle.grid, row.middle.wide));
            } else {
                rowArray.push(new BasicTile(row.left.grid, row.left.wide));
                rowArray.push(new BasicTile(row.middle.grid, row.middle.wide));
                rowArray.push(new BasicTile(row.right.grid, false));
            }
        });

        return rowArray;
    }
}