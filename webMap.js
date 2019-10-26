import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

let LatLng = {
    latitude:47.6183213,
    longitude:-122.3520037
}


const logger = function(message){
    console.log(message)
}

let Camera = {
    center: {
       latitude: 47.6183213,
       longitude: -122.3520037,
   },
   pitch: 0,
   heading: 0,
   // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
   altitude: 300,
   // Only when using Google Maps.
   zoom: 5
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView 
        style={styles.mapStyle} 
        onLongPress={() => logger} 
        fitToCoordinates={{coordinates:LatLng}}
        animateCamera={Camera , {duration:5000}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});