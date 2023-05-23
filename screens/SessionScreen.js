import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header_session from "../components/Header_session";
import Participants_session from "../components/Participants_session";
import Messages_session from "../components/Messages_session";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { getFetchAPI } = require("../modules/util");
const FETCH_API = getFetchAPI();

export default function SessionScreen({ navigation }) {
  const user = useSelector((state) => state.users.value);
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  console.log("user", user);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionResponse = await fetch(
          FETCH_API + `/sessions/oneSession/${user.session}`
        );
        const fetchSessionsUser = await sessionResponse.json();
        console.log("fetch", fetchSessionsUser);
        setSessions(fetchSessionsUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSession();
  }, []);

  console.log("session", sessions);

  const startDateTime = new Date(sessions.data?.date_start);
  const endDateTime = new Date(sessions.data?.date_end);
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
  console.log("data", sessions.data);

  return (
    <View style={styles.container}>
      <Header_session
        name={sessions.data?.name}
        spot={sessions.data?.spot?.name}
        googlelink={"Google maps"}
        date={formattedDate}
        startHours={startHours}
        startMinutes={startMinutes}
        endHours={endHours}
        endMinutes={endMinutes}
      />
      <View style={styles.description}>
        <Text style={styles.textDescription}>{sessions.data?.description}</Text>
      </View>
      <ImageBackground
        style={styles.wave2}
        source={require("../assets/waveSable.png")}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={50}
          >
            <View style={styles.all}>
              <Participants_session
                users={sessions.data?.users}
                admin={sessions.data?.admin}
              />
              <Messages_session sessionId={sessions.data?._id} />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("ReportScreen")}
              >
                <Text style={styles.textButton}>Join</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
  },
  description: {
    backgroundColor: "#F2CB02",
    paddingTop: "5%",
    paddingBottom: "5%",
    width: "100%",
    alignItems: "center",
  },
  textDescription: { color: "white", fontSize: 10 },
  wave2: {
    height: 800,
    width: "100%",
  },
  scrollContainer: { paddingBottom: 350 },
  scrollView: {},
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    marginTop: 30,
    backgroundColor: "#5FB6DA",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: { color: "#ffffff", fontWeight: "600", fontSize: 14 },
  all: { display: "flex", flexDirection: "column", alignItems: "center" },
});
