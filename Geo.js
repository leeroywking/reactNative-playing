import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


_storeData = async (oldLocations, newLocation) => {
  try {
    console.log('trying to store ')
    // await AsyncStorage.setItem('PAST_LOCATIONS', [...oldLocations, newLocation]);
  } catch (error) {
    console.error(error)
  }
};

_retrieveData = async () => {
  console.log('retrieval started')
  try {
    const value = await AsyncStorage.getItem('PAST_LOCATIONS');
    if (value !== null) {
      // We have data!!
      console.log('here is the data', value);
      return value
    }
  } catch (error) {
    console.log('this is an error!!!!!!!!!!!!!!!')
    console.error(error)
  }
};

class Loc {
  constructor(lat, lng, time) {
    this.lat = lat,
      this.lng = lng,
      this.time = time
  }
}


export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    oldLocs: [{ lat: 5, lng: 5, time: 5 }],
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      const oldData = _retrieveData();
      console.log(oldData)
      this.setState({ ...this.state.oldLocs, oldLocs: oldData })
    }
  }


  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    let loc = new Loc(location.coords.latitude, location.coords.longitude, location.timestamp);
    const old = await _retrieveData();
    await _storeData(old, loc);
    console.log(loc);
    console.log(location)
    console.log(this.state)
    console.log('done!')

  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <>
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text} </Text>
      </View>
      <View style={styles.containter}>
        {/* <FlatList style={styles.paragraph}
          data={this.state.oldLocs}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => <Text>{item.lat}, {item.lng}, {item.time} </Text>}
        /> */}
      </View>
      </>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});