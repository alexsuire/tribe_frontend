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
        <SafeAreaView style={styles.textHeader}>
          <Text style={styles.title}>Your sessions</Text>
          <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate('CreateSessionScreen')}>
            <MaterialCommunityIcons
              style={styles.plus}
              name={"plus-box-outline"}
              size={40}
              color={"#16A1F7"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={styles.body}>
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
    // alignItems: "flex-end",
    justifyContent: "space-around",
  },

  button: {
    width: 40,
    marginTop: 30,
    marginLeft: 40,
  },
  plus: {},
  textHeader: {
    color: "#16A1F7",
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 300,
    marginBottom: 6,
    color: "#16A1F7",
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
