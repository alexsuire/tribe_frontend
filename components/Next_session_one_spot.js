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

const sessionsData = [
  { date: "10/05/2023", hour: "6am - 8am", number: "5 people" },
  { date: "12/05/2023", hour: "11am - 1pm", number: "1 people" },
  { date: "13/05/2023", hour: "4pm - 6pm", number: "4 people" },
  { date: "14/05/2023", hour: "6am - 8am", number: "3 people" },
];

export default function Next_session_one_spot() {
  const session = sessionsData.map((data, i) => {
    return (
      <View key={i} style={[styles.body, i === 0 && styles.firstSession]}>
        <Text style={styles.date}>{data.date}</Text>
        <Text style={styles.border}>|</Text>
        <Text style={styles.hour}>{data.hour}</Text>
        <Text style={styles.number}>{data.number}</Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.myNextSession}>
          My Next Session in : Ile d'Oleron - chassiron
        </Text>
      </View>
      <View style={styles.sessionContainer}>{session}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "8%",

    width: "70%",
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

  myNextSession: {
    color: "white",
    fontSize: 12,
    fontWeight: 500,
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
    marginHorizontal: 20, // Ajouter des marges horizontales
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
    borderTopWidth: 0, // Remove the top border for the first session
  },
  number: {
    fontSize: 10,
    marginTop: 12,
    color: "#646262",
  },
});