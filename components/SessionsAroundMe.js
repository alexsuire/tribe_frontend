import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MY_FETCH_API from "../myfetchapi";
import * as Location from "expo-location";

export default function SessionsAroundMe() {
  const [sessions, setSessions] = useState([]);
  const [closestSessions, setClosestSessions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MY_FETCH_API + `/sessions/`);
        const fetchSessionsUser = await response.json();
        setSessions(fetchSessionsUser);
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
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
          setCurrentLocation(newLocation.coords);
        });
      }
    })();
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

  console.log("closest", closestSessions);

  if (closestSessions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.twoFirstText}>
            <Text style={styles.session}>Session</Text>
          </View>
          <Text style={styles.myNextSession}> Sessions around me</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.myNextSession}>Next Sessions in :</Text>
      </View>
      <View style={styles.sessionContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "10%",
    width: "85%",
    maxHeight: 200,
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
    fontWeight: 600,
  },
});
