import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, Button, Linking } from 'react-native';
import Geo from './Geo.js'
    
export default function App() {
  const [permissions, setPermissions] = useState('');
  const [location, setLocation] = useState({});


  return (
    <View style={styles.container}>
      <Geo functions={setLocation}/>
      {/* <Text>Hello!</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


