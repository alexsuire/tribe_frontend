// Favorite_spots_signup.js
import React, { useState } from "react";
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { selectSpot, deselectSpot, incrementCount, decrementCount } from "../reducers/count";

export default function Nationality(props) {


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.opacity} disabled={checkedCount >= 3 && !checked}>
        <ImageBackground
          source={require("../assets/favoriteSpotsImage.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text>{props.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "40%",
    height: "25%",
  },
  image: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  opacity: {
    backgroundColor: "black",
  },
});
