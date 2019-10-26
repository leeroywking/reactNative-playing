import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { saveLocation, getLocation } from './Save.js'
import Jump from './Jump.js'


class Loc {
  constructor(lat, lng, time) {
    this.lat = lat,
      this.lng = lng,
      this.time = time
  }
}


export default class App extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    location: {},
    errorMessage: null,
    oldLoc: {},
  };



  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  refreshLocation = async () => {
    this.setState({...this.state, location: {}})
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ ...this.state, location });
    let oldLocation = await this._loadSavedLocation();
    this.setState({ ...this.state, oldLoc: oldLocation })
  };

  _loadSavedLocation = async () => {
    let oldLoc = await getLocation();
    return oldLoc
  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <>
        <View style={styles.containter}>

          {this.state.location.coords ?
            <Button style={styles.button} title="Refresh location" onPress={this.refreshLocation} />
            :
            <Button style={styles.button} color="red" title="Refreshing..." />
          }
          
          <Text style={styles.paragraph}/>
          
          {this.state.location.coords ?
            <Button style={styles.button} title="Save this location" onPress={() => saveLocation(this.state.location)} />
            :
            <Button style={styles.button} color="red" title="Finding Current Location" />
          }

          <Text style={styles.paragraph}/>

          {this.state.oldLoc.coords ?
            <Jump style={styles.button} jumpto={this.state.oldLoc} />
            :
            <Button style={styles.button} color="red" title="Loading Saved Location" />
          }

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
    margin: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    margin: 20,
    height: 100,
    color: 'purple',
  }
});