import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { addSession } from "../reducers/users";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

export default function Preview_mysessions(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("props", new Date(props.date_start).getHours());

  const startDateTime = new Date(props.date_start);
  const endDateTime = new Date(props.date_end);

  const startHours = startDateTime.getHours();
  const startMinutes = startDateTime.getMinutes();
  const endHours = endDateTime.getHours();
  const endMinutes = endDateTime.getMinutes();
  // Extraction du mois
  const month = (startDateTime.getMonth() + 1).toString(); // +1 pour obtenir le mois correct (de 0 à 11)

  // Ajout d'un 0 devant le mois si nécessaire
  const formattedMonth = month.padStart(2, "0");

  // Formattage de la date en locale avec le mois formaté
  const formattedDate =
    startDateTime.getDate() +
    "/" +
    formattedMonth +
    "/" +
    startDateTime.getFullYear();
  console.log("props", props);
  
  const handleNavigateSession = () => {
    dispatch(addSession(props._id));
    navigation.navigate('SessionScreen');
  };

  return (
    <TouchableOpacity onPress={() => handleNavigateSession()}>
      <View style={styles.container}>
        <Text style={styles.name}>{props.spot.name}</Text>
        <Text style={styles.date}>{formattedDate}</Text>

        <View style={styles.twoHour}>
          <Text style={styles.hour}>
            {startHours}h{startMinutes}-
          </Text>
          <Text style={styles.hour}>
            {endHours}h{endMinutes}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginTop: 20,
    width: "95%",
    height: 70,
    backgroundColor: "#F0F0F0",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#C2B192",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  opacity: {
    backgroundColor: "#C2B192",
  },
  name: { fontSize: 14, color: "#5FB6DA", fontWeight: 500 },
  date: { fontSize: 12, color: "#5FB6DA", fontWeight: 200 },
  hour: { fontSize: 12, color: "#5FB6DA", fontWeight: 200 },
  twoHour: {
    display: "flex",
    flexDirection: "row",
  },
});
