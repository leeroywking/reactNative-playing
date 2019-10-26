import { AsyncStorage } from 'react-native';


  const saveLocation = async (location) => {
    console.log(location)
    location = JSON.stringify(location)
    console.log(location)
    try {
      const savedLocation = await AsyncStorage.setItem('LOCATION', location);
      console.log(savedLocation)
    } catch (error) {
      // Error retrieving data
      console.error(error)
    }
  };

  const getLocation = async () => {
    try {
      const loc =  await AsyncStorage.getItem('LOCATION')
      console.log(loc);
      return JSON.parse(loc)
    }
    catch (error) {
      console.log(error)
    }
  }

  export {saveLocation, getLocation}