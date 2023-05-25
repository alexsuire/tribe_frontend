import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MY_FETCH_API from "../myfetchapi";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "../reducers/users";

export default function SessionsAroundMe(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [sessions, setSessions] = useState([]);
  const [closestSessions, setClosestSessions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MY_FETCH_API + `/sessions/`);
        const fetchSessionsUser = await response.json();
        setSessions(fetchSessionsUser);
        console.log("la sess1111", sessions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchClosestSessions = async () => {
      try {
        if (currentLocation && sessions.data) {
          const userLocation = {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          };
          const sessionsWithDistance = sessions.data.map((session) => {
            console.log("la sess", session);
            const sessionLocation = session.spot; // Replace this with the actual session location object
            if (
              sessionLocation &&
              sessionLocation.latitude &&
              sessionLocation.longitude
            ) {
              const distance = calculateDistance(userLocation, sessionLocation);
              return { ...session, distance };
            }
            return session;
          });

          sessionsWithDistance.sort((a, b) => a.distance - b.distance);

          const closestFiveSessions = sessionsWithDistance.slice(0, 5);
          setClosestSessions(closestFiveSessions);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchClosestSessions();
  }, [sessions, currentLocation]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          Location.watchPositionAsync(
            { distanceInterval: 10 },
            (newLocation) => {
              setCurrentLocation(newLocation.coords);
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    requestLocationPermission();
  }, []);

  const calculateDistance = (location1, location2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = location1.latitude;
    const lon1 = location1.longitude;
    const lat2 = location2.latitude;
    const lon2 = location2.longitude;

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const degToRad = (angle) => {
    return angle * (Math.PI / 180);
  };

  if (sessions.length === 0 || closestSessions.length === 0) {
    // Return a loading indicator or placeholder while fetching data
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.twoFirstText}>
            <Text style={styles.session}>Session</Text>
          </View>
          <Text style={styles.myNextSession}>Sessions around me</Text>
        </View>
      </View>
    );
  }

  const session = closestSessions.map((data, i) => {
    const handlePress = () => {
      dispatch(addSession(data._id));
      navigation.navigate("SessionScreen");
    };
    const spot = data.spot?.name;
    const inputDate = data.date_start;
    const inputDateEnd = data.date_end;
    const date = new Date(inputDate);
    const date_end = new Date(inputDateEnd);

    const hour = date.getHours();
    const hour_end = date_end.getHours();

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return (
      <TouchableOpacity onPress={handlePress} key={i}>
        <View style={[styles.body, i === 0 && styles.firstSession]}>
          <Text style={styles.date}>{spot}</Text>
          <Text style={styles.border}>|</Text>
          <Text style={styles.hour}>
            {hour}h-{hour_end}hx
          </Text>
          <Text style={styles.number}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.session}>Session</Text>
        <Text style={styles.myNextSession}>Sessions around me</Text>
      </View>
      <View style={styles.sessionContainer}>{session}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "10%",
    width: "85%",
    maxHeight: 250,
  },

  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#5FB6D9",
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "3%",
    justifyContent: "space-around",
  },
  session: {
    color: "white",
  },
  twoFirstText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  myNextSession: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  sessionContainer: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-around",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  body: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  date: {
    fontSize: 11,
    marginTop: 12,
    color: "#646262",
  },
  hour: {
    fontSize: 10,
    marginTop: 12,
    color: "#646262",
  },
  border: {
    fontSize: 20,
    marginTop: 12,
    color: "#646262",
  },
  firstSession: {
    borderTopWidth: 0,
  },
  number: {
    fontSize: 10,
    marginTop: 12,
    color: "#646262",
  },
});
