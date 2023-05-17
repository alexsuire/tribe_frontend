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
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Header_spot() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.spotName}>
          <Text style={styles.spotName}>Ile d'Oleron - Chassiron</Text>
        </View>
        <View style={styles.allText}>
          <View style={styles.typeAndmaps}>
            <Text style={styles.type}>Type :Reef Break</Text>
            <Text style={styles.maps}>Google maps : link</Text>
          </View>
          <View style={styles.ratingAndrealiability}>
            <Text style={styles.rating}>
              Rating: <Text style={styles.stars}>★★★</Text>
            </Text>
            <Text style={styles.realiability}>
              Realiability:Very consistant
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",

    width: "100%",
    height: "25%",
  },
  allText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  spotName: {
    color: "#646262",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "5%",
  },
  typeAndmaps: {
    marginLeft: "3%",
  },
  type: {
    color: "#646262",
    paddingBottom: "30%",
    fontSize: 10,
  },
  maps: {
    color: "#646262",
    fontSize: 10,
  },
  ratingAndrealiability: {
    marginRight: "3%",
  },
  rating: {
    color: "#646262",
    paddingBottom: "20%",
    fontSize: 10,
  },

  realiability: {
    color: "#646262",
    fontSize: 10,
  },
  stars: {
    color: "#F2CB05",
  },
});
