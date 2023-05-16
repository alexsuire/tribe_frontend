// Favorite_spots_signup.js
import React, { useState } from "react";

import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSpot,
  deselectSpot,
  incrementCount,
  decrementCount,
} from "../reducers/count";
import countries from "../data/countries.json";

export default function Nationality(props) {
  const getShortName = (countryName) => {
    for (const [shortName, name] of Object.entries(countries)) {
      if (name === countryName) {
        return shortName;
      }
    }
  };

  let shortName = getShortName(props.country);


  if (shortName) {
    shortName = shortName.toString().toLowerCase();
  } else if (shortName === undefined) {
    shortName = "fr"
  }

  console.log("shortname", shortName);





  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.opacity}
      >
    
          <Text>{props.country}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    width: 40,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  opacity: {
    backgroundColor: "grey",
  },
});
