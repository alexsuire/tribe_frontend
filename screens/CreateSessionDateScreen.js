import React, { useState } from "react";
import {
    Image,
    View,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView, ScrollView, Button
  } from "react-native";
  import DateTimePickerModal from "react-native-modal-datetime-picker";

  export default function CreateSessionDateScreen({ navigation }) {


  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (time) => {
    setStartTime(time);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = (time) => {
    setEndTime(time);
    hideEndTimePicker();
  };

  function formatTime(time) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`;
    }

return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >     


    <View style={styles.header}>
        <TouchableOpacity  onPress={() => navigation.navigate('CreateSessionScreen')}>
            <Image style={styles.back} source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Your sessions</Text>
    </View>



    <View style={styles.body}>
      <View style={styles.sessionsContainer}>
        <View style={styles.date}>
        <Text style={styles.horaire}>{selectedDate ? selectedDate.toDateString() : "..."}</Text>
                <Button title="Select Date" color='black' onPress={showDatePicker} />
            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            value={date}
            onChangeText={setDate}
            />
            
        </View>
        <View style={styles.heuresession}>
            <View style={styles.heure}>
                <Text style={styles.horaire}>{startTime ? formatTime(startTime) : "..."}</Text>
                    <Button title="Select Start Session" color='black' onPress={showStartTimePicker} />
                <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={hideStartTimePicker}
                value={heure}
            onChangeText={setHeure}
                />
            </View>
            <View style={styles.heure}>
                <Text style={styles.horaire}>{endTime ? formatTime(endTime): "..."}</Text>
                    <Button title="Select End Session" color='black' onPress={showEndTimePicker} />
                <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideEndTimePicker}
                value={heure}
            onChangeText={setHeure}
                />
            </View>
        </View>
        <Button
            title="Next"
            onPress={() => {
                if (startTime && endTime && selectedDate) {
                navigation.navigate("CreateSessionDateScreen");
                } else {
                alert('Please complete your session Bodhi 🤙');
                }
            }}
            style={styles.next}
        />
      
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
  back:{
    width: 25,
    height: 25,
    tintColor: '#0487D9',
    marginLeft: 20,
    marginRight: 30,
  },
  scrollView: {
    paddingBottom: 320,
  },
  horaire:{
    marginLeft: 10,
  },
  buttonheure:{
    borderColor: '#16A1F7',
    borderWidth: 1,
    borderRadius: 5,

    
  },
  header: {
    height: "18%",
    width: "100%",
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
    color: "#0487D9",
  },
  body: {
    display: "flex",
    alignItems: "center",
  },
  sessionde:{
    margin: 15,
    fontSize: 20,
    fontWeight: 500,
  },
  date:{
    display: "flex",
    // flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    width: '95%',
    height: 50,
    marginBottom: 40,

  },
  heuresession:{
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    width: '95%',
  },
  heure:{
    display: "flex",
    // flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    width: '95%',
    height: 50,
    margin: 40,

  },

  sessionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#F0F0F0",
    height: "85%",
    width: "90%",
    marginTop: 10,
    borderRadius: 10,
  },
  spot:{
    borderColor: '#16A1F7',
    borderWidth: 1,
    borderRadius: 5,
    width: '95%',
    height: 60,
    margin: 8,
  },
  description:{
    borderColor: '#16A1F7',
    borderWidth: 1,
    borderRadius: 5,
    width: '95%',
    height: 100,
    margin: 8,

  }
});