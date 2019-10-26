import React, { Component } from 'react';
import { Button } from 'react-native';
import openMap from 'react-native-open-maps';


export default (props) => {

    let lat = props.jumpto.coords.latitude
    let lng = props.jumpto.coords.longitude
  const jump = function(location) {
    console.log(location)
    openMap({ latitude: lat, longitude: lng });
  }

    return (
      <Button
        // color={'#bdc3c7'}
        onPress={() => jump(props.jumpto)}
        title="Show me my saved location 🗺" />
    );
}  