# PCBTWBT App

This is the app for the Magic Mirror project.


## Preparation
To be able to use the project, navigate into the MagicMirrorApp folder and run:
```
$ npm install
```

and the following commands:
```
$ ionic plugin add --save cordova-plugin-geolocation
$ ionic plugin add --save cordova-plugin-ble-central
```
Also you have to generate an API key for Google Maps and include it in the following command (Android, iOS or both):
```
$ ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="ANDROID_KEY" --variable API_KEY_FOR_IOS="IOS_KEY"
```

Now you should be good to go.

## Run & Develop
If you want to run the app in the browser run:
```
$ ionic serve
```

To run the app on the Android emulator run the following 2 commands:
```
$ cordova platform add android
$ ionic run android
```