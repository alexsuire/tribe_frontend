import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
const { getFetchAPI } = require("../modules/util");
const FETCH_API = getFetchAPI();
import { useDispatch, useSelector } from "react-redux";
import Preview_session from "../components/Preview_session";

export default function SessionScreen({ navigation }) {
  const [sessions, setSessions] = useState([]);

  const user = useSelector((state) => state.users.value);

  console.log("montokenquejerecupere", user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(FETCH_API + `/users/${user.token}`);
        const fetchSessionsUser = await response.json();

        setSessions(fetchSessionsUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log("youpi", sessions);

  const session = sessions.map((data, i) => (
    <Preview_session key={i} {...data} />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons
              style={styles.map}
              name={"plus-box-outline"}
              size={50}
              color={"#16A1F7"}
            />
            <Text style={styles.textHeader}> Add session </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Your preview sessions</Text>
        <View style={styles.sessionsContainer}>{session}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0CDA9",
  },
  header: {
    height: "18%",
    width: "100%",
    backgroundColor: "#F0F0F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textHeader: {
    color: "#16A1F7",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: 300,
    marginTop: 10,
  },
  body: {
    display: "flex",
    alignItems: "center",
  },
  sessionsContainer: {
    backgroundColor: "#F0F0F0",
    height: "82%",
    width: "90%",
    marginTop: 10,
    borderRadius: 10,
  },
});
