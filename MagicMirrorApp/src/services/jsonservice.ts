import { BLE } from "@ionic-native/ble";

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

    public readonly exampleJSON: any = {
    "one": [
        {
            "row": 1,
            "left": { "grid": "quiz", "wide": true },
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


    public readonly jsonForDesktop: any = this.exampleJSON;
    /*{
        "one": [],
        "two": [],
        "three": []
    };*/

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

    public currentMirrorMacAddress: string = "";

    static instance:JsonService;
    static isCreating:Boolean = false;

    constructor(private ble: BLE) {
        if (!JsonService.isCreating) {
            throw new Error("You can't call new in Singleton instances! Call JsonService.getInstance() instead.");
        }
    }

    static getInstance() {
        if (JsonService.instance == null) {
            JsonService.isCreating = true;
            JsonService.instance = new JsonService(new BLE);
            JsonService.isCreating = false;
        }

        return JsonService.instance;
    }

    createRow(rowNumber: number, firstTile: Tile, secondTile: Tile, thirdTile?: Tile) {
        let row: any = {};

        row.row = rowNumber;

        if(typeof thirdTile !== 'undefined') {
            row.left = {"grid": firstTile.type, "wide": firstTile.doubleTile};
            row.middle = {"grid": secondTile.type, "wide": secondTile.doubleTile};
            row.right = {"grid": thirdTile.type};
        } else {
            row.left = {"grid": firstTile.type, "wide": firstTile.doubleTile};
            row.middle = {"grid": secondTile.type, "wide": secondTile.doubleTile};
            row.right = {"grid": "empty"};
        }

        return row;
    }

    createGridForDesktop(desktopNumber: number, firstRow: any, secondRow: any, thirdRow: any): string {

        let gridArray: any[] = [];

        gridArray.push(firstRow);
        gridArray.push(secondRow);
        gridArray.push(thirdRow);

        switch(desktopNumber) {
            case 1:
                this.jsonForDesktop.one = gridArray;
                break;
            case 2:
                this.jsonForDesktop.two = gridArray;
                break;
            case 3:
                this.jsonForDesktop.three = gridArray;
                break;
        }

        console.log('Final mirror grid update', this.jsonForDesktop);

        return JSON.stringify(this.jsonForDesktop);
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

    sliceStringToChunks(completeData: string, jsonType: string, chunkSize: number = 290): ArrayBuffer[] {
        let allPackets: string[] = [];
        let allBufferPackets: ArrayBuffer[] = [];
        let currentStart: number = 0;
        let currentChunk: string = "<" + jsonType; //+ completeData.substring(currentStart, chunkSize - jsonType.length);

        allPackets.push(currentChunk);

        while(completeData.length > (currentStart)) {
          currentChunk = completeData.substring(currentStart, currentStart + chunkSize);
          allPackets.push(currentChunk);
          currentStart += chunkSize;
        }

        allPackets.push(">");

        console.log("allStrings", allPackets);

        for(let i = 0; i < allPackets.length; i++) {
          allBufferPackets.push(this.stringToArrayBuffer(allPackets[i]));
        }

        return allBufferPackets;
    }

    sendData(dataChunk: ArrayBuffer[], part: number = 0): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if(dataChunk.length > part) {
                this.ble.write(JsonService.getInstance().currentMirrorMacAddress, "141d9866-1554-11e7-93ae-92361f002671", "141d9c76-1554-11e7-93ae-92361f002671", dataChunk[part]).then(answer => {
                    console.log("Successfully sent chunk " + (part + 1) + " of " + dataChunk.length, answer, this.arrayBufferToString(dataChunk[part]), dataChunk[part]);
                    this.sendData(dataChunk, part + 1).then(recursiveAnswer => {
                        resolve(recursiveAnswer);
                    });
                }).catch(error => {
                    console.log(error);
                });
            } else {
                resolve(true);
            }
        });
    }

    arrayBufferToString(buf): string {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    stringToArrayBuffer(str): ArrayBuffer {
    let buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    let bufView = new Uint16Array(buf);
    for (let i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
    }
}