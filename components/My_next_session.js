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

export default function My_next_session() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.twoFirstText}>
          <Text style={styles.session}>Session</Text>
          <Text style={styles.daysLeft}>2 days left</Text>
        </View>
        <Text style={styles.myNextSession}> My Next Session</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sessionPlace}>Lacanau</Text>
        <Text style={styles.border}>|</Text>
        <Text style={styles.sessionName}>Session de Titi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "10%",
    width: "85%",
    height: "100%",
  },

  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F2CB05",
    height: "13%",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "3%",
    justifyContent: "space-around",
  },
  session: {
    color: "white",
  },
  myNextSession: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
  },
  daysLeft: {
    color: "white",
    fontSize: 10,
    marginTop: "3%",
  },
  twoFirstText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    backgroundColor: "white",
    height: "10%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  sessionPlace: {},
  sessionName: {
    fontSize: 12,
  },
  border: {
    fontSize: 20,
  },
});
