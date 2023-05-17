import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Button, SafeAreaView, Pressable, Picker } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Dimensions} from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function MapScreen({ navigation }) {
  const [inputMap, setInputMap] = useState('');
  const [location, setLocation] = useState(null);
  const [spots, setSpots] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleClearButtonPress = () => {
    const results = spots.filter(spot => spot.name.toLowerCase().includes(inputMap.toLowerCase()));
    setSearchResults(results);
    setInputMap('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.33.210.6:3000/spots");
        const json = await response.json();
        const data = json.data;
        setSpots(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
         console.log('status:', status);
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (newLocation) => {
            setLocation(newLocation);
          });
      }
    })();
   }, []);

   if (!location) {
    return <View />;
  }

  const icon={ surfboard: require("../assets/surfboard.png")}


  const markers = (searchResults.length > 0 ? searchResults : spots).map((spot, index) => (
    <Marker
      key={index}
      coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
      title={spot.name} 
      onCalloutPress={ () => navigation.navigate('One_spot', {spot})}
      >
      <Image source={icon.surfboard} style={{ width: 40, height: 40 }}/>
    </Marker>
  ));

 return (
  <SafeAreaView  style={styles.container}>
    <View style={styles.inputSection}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SpotScreen')}>
            <FontAwesome name='arrow-circle-left' size={50} color='#0287D9' />
        </TouchableOpacity>
        <TextInput
            placeholder='Que cherchez-vous ?'
            style={styles.input1}
            value={inputMap}
            onChangeText={(text) => setInputMap(text)}
        />
        <TouchableOpacity style={styles.clear} onPress={handleClearButtonPress}>
            <FontAwesome name='search' size={25} color='white' />
        </TouchableOpacity>
        </View>
	  </View>
    <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {markers}
    </MapView>
</SafeAreaView>
  );
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
  },

inputSection: {
	  width: '100%',
	  height: '20%',
    display: 'flex',
    flexDirection: 'row',
	  justifyContent: 'center',
    backgroundColor: 'white',

	},
  header:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
 
  
  input1: {
    borderWidth: 1,
    width: 250,
    borderColor: '#0287D9',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 17,
	},


  clear:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0287D9',
    borderWidth: 12,
    borderRadius: 50,
    borderColor: '#0287D9',
    height: 50,
    width: 50,
  
  },
  recherche:{
    marginTop: 28,
    height: 150,
    width: 310,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuhaut:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    position: 'absolute',
  },

  menustyle:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button:{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  },

  textButton:{
    width: 40, 
    height: 40, 
  },  

 
})