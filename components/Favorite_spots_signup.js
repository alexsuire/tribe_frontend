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

export default function Favorite_spots_signup(props) {

  
  return (
    <View style={styles.container}>
      <Text style={styles.spotName}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "38%",
    height: "100%",
    backgroundColor: "gray",
    
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
