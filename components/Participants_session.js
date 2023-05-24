import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function Participants_session(props) {
  const participants = props.users?.map((data, i) => {
    return (
      <View key={i} style={styles.body}>
        <View style={styles.firstnameContainer}>
          <Text style={styles.firstname}>{data.firstname}</Text>
        </View>
        <View style={styles.ageContainer}>
          <Text style={styles.age}>{data.age} y.o</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.level}>{data.level}</Text>
        </View>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Participants</Text>
      </View>

      <ScrollView style={styles.participantsContainer}>
        <View style={styles.body2}>
          <View style={styles.firstnameContainer2}>
            <Text style={styles.firstname}>
              {" "}
              <MaterialCommunityIcons
                style={styles.cloud}
                name={"crown"}
                size={0}
                color={"#F2CB02"}
              />{" "}
              {props.admin?.firstname}
            </Text>
          </View>
          <View style={styles.ageContainer}>
            <Text style={styles.age}>{props.admin?.age} y.o</Text>
          </View>
          <View style={styles.levelContainer}>
            <Text style={styles.level}>{props.admin?.level}</Text>
          </View>
        </View>
        {participants}
      </ScrollView>
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

    backgroundColor: "#5FB6DA",
    height: 60,
    alignItems: "center",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "3%",
    justifyContent: "space-around",
  },

  title: {
    color: "white",
    fontSize: 12,
    fontWeight: 500,
  },

  participantsContainer: {
    backgroundColor: "white",

    maxHeight: 270,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  ageContainer: {
    width: 90,
  },
  levelContainer: { width: 90, marginLeft: 20 },
  firstnameContainer: { width: 90 },
  firstnameContainer2: { width: 110 },
  firstname: { fontSize: 11, marginTop: 12, color: "#646262" },
  age: { fontSize: 10, marginTop: 12, color: "#646262", textAlign: "center" },
  level: { fontSize: 10, marginTop: 12, color: "#646262" },

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
  body2: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 15,
    marginRight: 20, // Ajouter des marges horizontales
  },

  firstParticipant: {
    borderTopWidth: 0, // Remove the top border for the first session
  },
});
