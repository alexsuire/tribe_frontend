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
import MY_FETCH_API from "../myfetchapi";
import { useDispatch, useSelector } from "react-redux";

export default function NextSession_home() {
  const [sessions, setSessions] = useState([]);
  const [firstNextSession, setFirstNextSession] = useState([]);

  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MY_FETCH_API + `/users/${user.token}`);
        const fetchSessionsUser = await response.json();

        setSessions(fetchSessionsUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []);

  console.log(sessions)

  function getClosestSession(data) {
    const currentDate = new Date();
    data.sort((sessionA, sessionB) => {
      const dateA = new Date(sessionA.date_start);
      const dateB = new Date(sessionB.date_start);
      const diffA = Math.abs(dateA - currentDate);
      const diffB = Math.abs(dateB - currentDate);
      return diffA - diffB;
    });
    return data[0];
  }


  useEffect(() => {
    const nextSession = getClosestSession(sessions)
    setFirstNextSession(nextSession)
  }, [sessions]);

  



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
        {/* <Text style={styles.sessionPlace}>{firstNextSession.name}</Text> */}
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
