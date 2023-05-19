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

export default function Header_session(props) {
  const startDateTime = new Date(props.date_start);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.sessionName}>
          <Text style={styles.sessionName}>{props.name}</Text>
        </View>
        <View style={styles.allText}>
          <View style={styles.spotAndmaps}>
            <Text style={styles.spot}>{props.spot}</Text>
            <Text style={styles.maps}>{props.googlelink}</Text>
          </View>
          <View style={styles.dateAndhour}>
            <Text style={styles.date}>{props.date}</Text>
            <View style={styles.twoHour}>
              <Text style={styles.hour}>
                {props.startHours}h{props.startMinutes}-
              </Text>
              <Text style={styles.hour}>
                {props.endHours}h{props.endMinutes}
              </Text>
            </View>
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
  sessionName: {
    color: "#646262",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "5%",
  },
  spotAndmaps: {
    marginLeft: "3%",
  },
  spot: {
    color: "#646262",
    paddingBottom: "40%",
    fontSize: 10,
  },
  maps: {
    color: "#646262",
    fontSize: 10,
  },
  dateAndhour: {
    marginRight: "3%",
  },
  date: {
    color: "#646262",
    paddingBottom: "40%",
    fontSize: 10,
  },

  twoHour: {
    color: "#646262",
    display: "flex",
    flexDirection: "row",
  },
  hour: {
    color: "#646262",
    fontSize: 10,
  },
});
