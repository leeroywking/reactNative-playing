import { StyleSheet, FlatList, Text, View, Button, Linking, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function IdComponent() {
  const [id, setId] = useState('')
  const userId = '8ba790f3-5acd-4a08-bc6a-97a36c124f29';
  const saveUserId = async (props) => {
    try {
      await AsyncStorage.setItem('userId', userId);
    } catch (error) {
      // Error retrieving data
      console.error(error)
    }
  };

  const getUserId = async () => {
    try {
      return await AsyncStorage.getItem('userId')
    }
    catch (error) {
      console.log(error)
    }
  }

  saveUserId().then(b => {
    getUserId().then(data => {
      setId(data)
      console.log('THIS IS FROM STORAGE', data)
    })
  })
 
  return(<Text>Hello from ID component {id}</Text>)

}