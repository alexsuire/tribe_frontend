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
import { addSession } from "../reducers/users";

export default function NextSession_home(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [sessions, setSessions] = useState([]);
  const [firstNextSession, setFirstNextSession] = useState([]);
  const [remainingTime, setRemainingTime] = useState("");

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

  useEffect(() => {
    const nextSession = getClosestSession(sessions);
    setFirstNextSession(nextSession);

    if (nextSession) {
      const startDate = new Date(nextSession.date_start);
      const currentDate = new Date();
      const timeDifference = startDate.getTime() - currentDate.getTime();
      const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setRemainingTime(`${daysRemaining} days left`);
    }
  }, [sessions]);

  function getClosestSession(data) {
    const currentDate = new Date();
    const upcomingSessions = data.filter((session) => {
      const sessionDate = new Date(session.date_start);
      return sessionDate > currentDate;
    });
    upcomingSessions.sort((sessionA, sessionB) => {
      const dateA = new Date(sessionA.date_start);
      const dateB = new Date(sessionB.date_start);
      const diffA = Math.abs(dateA - currentDate);
      const diffB = Math.abs(dateB - currentDate);
      return diffA - diffB;
    });
    return upcomingSessions[0];
  }

  const handlePress = () => {
    dispatch(addSession(firstNextSession._id));
    navigation.navigate("Session", { screen: "SessionScreen" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.twoFirstText}>
          <Text style={styles.session}>Session</Text>
          <Text style={styles.daysLeft}>{remainingTime}</Text>
        </View>
        <Text style={styles.myNextSession}> My Next Session</Text>
      </View>
      {firstNextSession !== undefined && (
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.body}>
            <Text style={styles.sessionPlace}>
              {firstNextSession.spot?.name}
            </Text>
            <Text style={styles.border}>|</Text>
            <Text style={styles.sessionName}>{firstNextSession.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      {firstNextSession == undefined && (
        <View style={styles.body}>
          <Text style={styles.sessionName}>No session scheduled...🏄‍♀️</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 200,
    marginTop: 20,
  },

  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F2CB05",
    height: 90,
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  sessionPlace: {},
  sessionName: {
    fontSize: 12,
  },
  border: {
    fontSize: 20,
  },
});
