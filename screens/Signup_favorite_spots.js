import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Favorite_spots_signup from "../components/Favorite_spots_signup";

export default function Signup_favorite_spots({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [spots, setSpots] = useState([]);

  const count = useSelector((state) => state.count.value);

  console.log("count", count);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/spots");
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

  console.log(spots);

  const favspot =
    spots.length > 0
      ? spots.map((data, i) => <Favorite_spots_signup key={i} {...data} />)
      : null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.top}>
        <Text style={{ fontFamily: "Lato-Bold" }}>
          Choose up to 3 favorite spots
        </Text>
      </View>
      <View style={styles.spots}>{favspot}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  spots: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "30%",
    width: "100%",
    backgroundColor: "red",
  },
});
