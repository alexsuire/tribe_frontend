
import React, { useState } from "react";
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { addStartSession, addEndSession } from "../reducers/session";
import moment from "moment";

export default function CreateSessionDateScreen({ navigation }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.value);
  console.log("session", session);

  const formattedStartDate = startDate ? moment(startDate).format("DD/MM/YYYY HH:mm") : "";
  const formattedEndDate = endDate ? moment(endDate).format("DD/MM/YYYY HH:mm") : "";

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const handleNextButton = () => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();
      dispatch(addStartSession(formattedStartDate));
      dispatch(addEndSession(formattedEndDate));
      console.log("session", session);
      navigation.navigate("CreateSessionDescriptionScreen");
    } else {
      alert("Veuillez sélectionner les dates de début et de fin.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateSessionScreen")}>
          <Image style={styles.back} source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Your sessions</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.sessionsContainer}>
          <View style={styles.date}>
            <Text style={styles.label}>Start Date:</Text>
            <Button  title={formattedStartDate || "Select Start Date"}
              onPress={showStartDatePicker}/>
            <DateTimePickerModal
               isVisible={isStartDatePickerVisible}
               mode="datetime"
               onConfirm={handleStartDateConfirm}
               onCancel={hideStartDatePicker}
               date={startDate || new Date()}
            />
          </View>
          <View style={styles.date}>
            <Text style={styles.label}>End Date:</Text>
            <Button   title={formattedEndDate || "Select End Date"}
              onPress={showEndDatePicker} />
            <DateTimePickerModal
               isVisible={isEndDatePickerVisible}
               mode="datetime"
               onConfirm={handleEndDateConfirm}
               onCancel={hideEndDatePicker}
               date={endDate || new Date()}
            />
          </View>
          <Button title="Next" onPress={handleNextButton}style={styles.next} />
</View>
</View>
</KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#E0CDA9",
},
back: {
width: 25,
height: 25,
tintColor: "#0487D9",
marginLeft: 20,
marginRight: 30,
},
header: {
height: "18%",
width: "100%",
backgroundColor: "#F0F0F0",
display: "flex",
flexDirection: "row",
justifyContent: "flex-start",
alignItems: "center",
},
title: {
fontSize: 25,
fontWeight: "500",
color: "#0487D9",
},
body: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},
sessionsContainer: {
backgroundColor: "#F0F0F0",
width: "90%",
padding: 20,
borderRadius: 10,
},
date: {
marginBottom: 20,
},
label: {
fontSize: 18,
marginBottom: 10,
},
next: {
marginTop: 20,
},
});