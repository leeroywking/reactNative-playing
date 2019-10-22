import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, Button, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import Geo from './Geo.js'


export default function App() {
  const [permissions, setPermissions] = useState('');
  const [contacts, setContacts] = useState([]);
  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS)
    setPermissions(status)
  }

  const showContacts = async () => {
    console.log('getting the contacts');
    const contactList = await Contacts.getContactsAsync();
    setContacts(contactList.data)
    console.log(contactList.data)
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const call = (person) => {
    const phoneNumber = person.phoneNumbers[0].digits
    let link = `tel:${phoneNumber}`
    Linking.canOpenURL(link)
    .then((supported) => Linking.openURL(link))
    .catch(console.error);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Button title={item.name} onPress={() => call(item)} />}
      />
      <Text>Hi</Text>
      <Geo/>
      <Button title="this is a button" onPress={showContacts}></Button>
      <Text>Hello!</Text>
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



