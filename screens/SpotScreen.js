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
} from "react-native";
import Header_spot from "../components/Header_spot";
import NextSessions_spot from "../components/NextSessions_spot";
import Forecast_spot from "../components/Forecast_spot";
import users from "../reducers/users";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import MY_FETCH_API from "../myfetchapi";

export default function SpotScreen({ navigation }) {
  const [spot, setSpot] = useState(null); // Initialize spot as null
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          MY_FETCH_API + `/spots/oneSpot/${user.active_spot}`
        );
        const fetchSpot = await response.json();
        setSpot(fetchSpot);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!spot) {
    // Render loading state if spot is still null
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header_spot
        name={spot.data?.name}
        type={spot.data?.type}
        reliability={spot.data?.reliability}
        rating={spot.data?.rating}
        latitude={spot.data?.latitude}
        longitude={spot.data?.longitude}
      />
      <ImageBackground
        style={styles.wave2}
        source={require("../assets/wavesfinal.png")}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.all}>
            <NextSessions_spot
              sessions={spot.data?.sessions}
              name={spot.data?.name}
              navigation={navigation}
            />
            <Forecast_spot />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("ReportScreen")}
            >
              <Text style={styles.textButton}>See more</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
  },
  wave2: {
    height: 800,
    width: "100%",
  },
  scrollView: {
    paddingBottom: 320,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
