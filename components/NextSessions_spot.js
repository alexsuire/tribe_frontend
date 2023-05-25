import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { addSession } from "../reducers/users";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function NextSessionsSpot(props) {
  const dispatch = useDispatch();
  const { navigation } = props;
  console.log("props", props);

  if (props.sessions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header_no_sessions}>
          <Text style={styles.myNextSession}>
            No scheduled sessions for the moment buddy
          </Text>
        </View>
        <View style={styles.sessionContainer}></View>
      </View>
    );
  }

  const session = props.sessions.map((data, i) => {
    console.log("data", data);
    const handlePress = () => {
      dispatch(addSession(data._id));
      navigation.navigate("SessionScreen");
    };
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
      <TouchableOpacity onPress={handlePress}>
        <View key={i} style={[styles.body, i === 0 && styles.firstSession]}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.border}>|</Text>
          <Text style={styles.hour}>
            {hour}h-{hour_end}h
          </Text>
          <Text style={styles.number}>{data.users.length + 1} people</Text>
        </View>
      </TouchableOpacity>
    );
  });
  const handlePlusButtonPress = () => {
    navigation.navigate("CreateSessionScreen");
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerplus}>
        <Text style={styles.myNextSession}>
          Next Sessions in : {props.name}
        </Text>
        <TouchableOpacity
            style={styles.button}
            onPress={handlePlusButtonPress}
          >
            <MaterialCommunityIcons
              style={styles.plus}
              name={"plus"}
              size={28}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sessionContainer}>
      <ScrollView ContentContainerStyle  style={styles.scrollview}>
      {session}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "8%",
    width: "90%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  header: {
    display: "flex",
    backgroundColor: "#F2CB05",
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "3%",
    justifyContent: "space-around",
  },
  headerplus:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems:'center',
  },

  header_no_sessions: {
    display: "flex",
    backgroundColor: "#F2CB05",
    height: 60,
    borderTopLeftRadius: 20,
    borderRadius: 20,
    padding: "3%",
    justifyContent: "space-around",
  },
  myNextSession: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
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
  scrollview:{
    maxHeight: 360,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
