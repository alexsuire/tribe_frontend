import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from "react-native";
import MY_FETCH_API from "../myfetchapi";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addActive_spot } from "../reducers/users";


export default function Favorite_spots_home(props) {

    const user = useSelector((state) => state.users.value);
    const [userSessions, setUserSessions] = useState([]);
    const { navigation } = props;
  const dispatch = useDispatch();

console.log(user.token)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(MY_FETCH_API + `/users/userFavoriteSpot/${user.token}/`);
            const fetchSessionsUser = await response.json();
            setUserSessions(fetchSessionsUser);
          } catch (error) {
            console.error(error);
          }
        }; 
    
        fetchData();
      }, []);

      console.log("user", userSessions)

      const session = userSessions.map((data, i) => {
        console.log(data)
        const handlePress = () => {
          dispatch(addActive_spot(data._id));
          navigation.navigate("SpotScreen");
        };
        const spot = data.name;
        const rating = data.rating
        const region = data.region
    

    return (
        <TouchableOpacity onPress={handlePress} key={data._id}>
          <View key={i} style={[styles.body, i === 0 && styles.firstSession]}>
            <Text style={styles.date}>{spot}</Text>
            <Text style={styles.border}>|</Text>
            <Text style={styles.hour}>
             rating: {rating}
            </Text>
            <Text style={styles.number}>{region}</Text>
          </View>
        </TouchableOpacity>
      );
    })

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.session}>Spot</Text>
            <Text style={styles.myNextSession}>Your favorite spots</Text>
          </View>
          <View style={styles.sessionContainer}>{session}</View>
        </View>
      );


}

const styles = StyleSheet.create({
    container: {
        marginTop: 110,
      margin: "10%",
      width: "85%",
      maxHeight: 200,
    },
  
    header: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#16A1F7",
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
  