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
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
const { getFetchAPI } = require("../modules/util");
const FETCH_API = getFetchAPI();
import { useDispatch, useSelector } from "react-redux";
import Preview_mysessions from "../components/Preview_mysessions";
import { useIsFocused } from '@react-navigation/native';

export default function MySessionsScreen({ navigation }) {
  const isFocused = useIsFocused()
  console.log("isfocused", isFocused)

  const [sessions, setSessions] = useState([]);

  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const fetchData = async () => {
      if (!isFocused) {
        return
      }
      try {
        const response = await fetch(FETCH_API + `/users/${user.token}`);
        const fetchSessionsUser = await response.json();

        // Filter sessions based on the current date
        const currentDate = new Date();
        const filteredSessions = fetchSessionsUser.filter(
          (session) => new Date(session.date_start) > currentDate
        );

        // Sort the filtered sessions by date_start
        const fetchSorted = filteredSessions.sort(
          (a, b) => new Date(a.date_start) - new Date(b.date_start)
        );

        setSessions(fetchSorted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isFocused]);
  
  let content;
  if (sessions.length === 0) {
    content = (
      <View style={styles.noSessionContainer}>
        <Text style={styles.noSessionText}>No sessions found 😢</Text>
      </View>
    );
  } else {
    content = sessions.map((data, i) => (
      <Preview_mysessions key={i} {...data} />
    ));
  }

  console.log("session", sessions);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.textHeader}>
          <Text style={styles.title}>Your sessions</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CreateSessionScreen")}
          >
            <MaterialCommunityIcons
              style={styles.plus}
              name={"plus"}
              size={30}
              color={"#16A1F7"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={styles.body}>
        <View style={styles.sessionsContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {content}
          </ScrollView>
        </View>
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

    color: "#16A1F7",
  },
  body: {
    display: "flex",
    alignItems: "center",
  },
  sessionsContainer: {
    height: "88%",
    width: "94%",
    backgroundColor: "#F0F0F0",
    marginTop: 10,
    borderRadius: 10,
  },
  noSessionContainer: {
    height: "88%",
    width: "94%",
    backgroundColor: "#F0F0F0",
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 270,
  },
  noSessionText: {
    color: "#16A1F7",
    fontSize: 20,
    fontWeight: 200,
  },
  scrollView: {
    paddingBottom: 200,
  },
});
