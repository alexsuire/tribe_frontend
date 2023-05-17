import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Spot from "../components/Spot";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchSpotScreen({ navigation }) {
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState("");
  const [filteredSpots, setFilteredSpots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.33.210.6:3000/spots");
        const json = await response.json();
        const data = json.data;
        setSpots(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleSearch = (text) => {
    const filtered = spots.filter((spot) =>
      spot.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSpots(filtered);
    setSelectedSpot(text);
    console.log(filtered);
  };

  const spot =
    filteredSpots.length > 0
      ? filteredSpots.map((data, i) => (
          <Spot
            key={i}
            name={data.name}
            region={data.region}
            type={data.type}
          />
        ))
      : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <TextInput
            placeholder="Spots 🔎"
            id="SpotsName"
            value={selectedSpot}
            style={styles.input}
            onChangeText={handleSearch}
          />
        </SafeAreaView>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.spots}>{selectedSpot.length > 0 && spot}</View>
          <View style={styles.inactiveSpot}>
            {selectedSpot.length < 1 && (
              <Text style={styles.initialText}>Find your favorite spots !</Text>
            )}
            <MaterialCommunityIcons
              style={styles.map}
              name={"map-outline"}
              size={40}
              color={"white"}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  header: {
    backgroundColor: "#F0F0F0",
    width: "100%",
    alignItems: "center",
    height: "20%",
  },

  input: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    width: 300,
    height: 50,
    marginTop: 20,

    borderRadius: 7,
    borderColor: "#E0CDA9",
  },

  scrollContainer: {
    backgroundColor: "#0487D9",
    flex: 1,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  scrollView: {
    marginTop: 20,
    paddingBottom: 500,
    display: "flex",
    justifyContent: "center",
  },
  spots: {
    display: "flex",

    flexDirection: "column",

    justifyContent: "space-around",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    height: "7%",
    marginTop: 20,
    backgroundColor: "#5FB6DA",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: { color: "#ffffff", fontWeight: "600", fontSize: 14 },
  all: { display: "flex", flexDirection: "column", alignItems: "center" },
  inactiveSpot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  initialText: {
    marginTop: 220,
    color: "white",
    fontWeight: 200,
    fontSize: 20,
  },
  map: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});
