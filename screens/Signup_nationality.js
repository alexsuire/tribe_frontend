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
import Nationality from "../components/Nationality";
import countries from "../data/countries.json"

export default function Signup_nationality({ navigation }) {
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [filteredNationalities, setFilteredNationalities] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/nationalities/allCountries"
        );
        const json = await response.json();
        const data = json.data;
        setNationalities(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    const filtered = nationalities.filter((nation) =>
      nation.country.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredNationalities(filtered);
    setSelectedNationality(text);
  };



  const nation =
  filteredNationalities.length > 0
      ? filteredNationalities.map((data, i) => <Nationality key={i} {...data} />)
      : null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.top}>
        <Text style={{ fontFamily: "Lato-Bold" }}>
          Choose your nationality
        </Text>
        <TextInput
          style={styles.input}
          value={selectedNationality}
          placeholder="Enter your nationality"
          onChangeText={handleSearch}

        />
      </View>
      <View style={styles.spots}>{nation}</View>
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
