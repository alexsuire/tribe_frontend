import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  Pressable,
  Picker,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MY_FETCH_API from "../myfetchapi";
import {addActive_spot} from "../reducers/users"
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

export default function MapScreen({ navigation }) {
  const [inputMap, setInputMap] = useState("");
  const [location, setLocation] = useState(null);
  const [spots, setSpots] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();


  const mapViewRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const firstSpot = useSelector((state) => state.map.firstSpot);

  const handleMapReady = () => {
    setMapReady(true);
  };

  const handleClearButtonPress = () => {
    const results = spots.filter((spot) =>
      spot.name.toLowerCase().includes(inputMap.toLowerCase())
    );
    setSearchResults(results);
    setInputMap("");
    if (currentLocation) {
      const region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };
      mapViewRef.current.animateToRegion(region, 1000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MY_FETCH_API+ "/spots");
        const json = await response.json();
        const data = json.data;
        setSpots(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
          setLocation(newLocation);
          setCurrentLocation(newLocation);
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (firstSpot && mapReady) {
      // Centrer la carte sur le spot recherché
      const region = {
        latitude: firstSpot.latitude,
        longitude: firstSpot.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };
      mapViewRef.current.animateToRegion(region, 1000);
    }
  }, [firstSpot, mapReady]);

  if (!location) {
    return <View />;
  }

  const icon = { surfboard: require("../assets/surfboard.png") };

  const markers = spots.map((spot, index) => (
    <Marker
      key={index}
      coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
      title={spot.name}
      onCalloutPress={() => {
        dispatch(addActive_spot(spot._id)); 
        navigation.navigate("SpotScreen", { spot });
      }}    >
      <Image source={icon.surfboard} style={{ width: 40, height: 40 }} />
    </Marker>
  ));

  return (
    <View style={styles.container}>
      {/* <View style={styles.menu}>
      <TouchableOpacity  onPress={() => navigation.navigate('TabNavigator')}>
        <Image style={styles.back} source={require("../assets/back.png")} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={handleClearButtonPress}>
        <Image style={styles.localisation} source={require("../assets/localisation.png")} />
      </TouchableOpacity>
    </View> */}
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        onLayout={handleMapReady}
      >
        {markers}
      </MapView>

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")}>
          <Image style={styles.back} source={require("../assets/back.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearButtonPress}>
          <Image
            style={styles.localisation}
            source={require("../assets/localisation.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  menu: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
    width: "100%",
  },

  back: {
    width: 30,
    height: 30,
    tintColor: "#0487D9",
  },
  localisation: {
    width: 40,
    height: 40,
    tintColor: "#0487D9",
  },

  clear: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0287D9",
    borderWidth: 12,
    borderRadius: 50,
    borderColor: "#0287D9",
    height: 50,
    width: 50,
  },
  menuhaut: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
  },

  menustyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textButton: {
    width: 40,
    height: 40,
  },
});
