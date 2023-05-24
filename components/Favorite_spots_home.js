import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from "react-native";
import MY_FETCH_API from "../myfetchapi";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "../reducers/users";

export default function Favorite_spots_home(props) {

    const user = useSelector((state) => state.users.value);
    const [UserSessions, setUserSessions] = useState([]);

console.log(user.token)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(MY_FETCH_API + `users/${user.token}/`);
            const fetchSessionsUser = await response.json();
            setUserSessions(fetchSessionsUser);
          } catch (error) {
            console.error(error);
          }
        }; 
    
        fetchData();
      }, []);

      console.log("user", UserSessions)

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.session}>Session</Text>
            <Text style={styles.myNextSession}>Sessions around me</Text>
          </View>
          <View style={styles.sessionContainer}></View>
        </View>
      );


}

const styles = StyleSheet.create({
    container: {
        
      marginTop: "27%",
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
    sessionContainer: {
      backgroundColor: "white",
      display: "flex",
      justifyContent: "space-around",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
})