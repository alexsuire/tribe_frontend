import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MySessionsScreen from "../screens/MySessionsScreen";

export default function Header_session(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.pop(4)}>
            <Image style={styles.back} source={require("../assets/back.png")} />
          </TouchableOpacity>
          <View style={styles.sessionName}>
            <Text style={styles.sessionNametitle}>{props.name}</Text>
          </View>
        </View>
        <View style={styles.allText}>
          <View style={styles.spotAndmaps}>
            <Text style={styles.spot}>{props.spot}</Text>
            <Text style={styles.maps}>{props.googlelink}</Text>
          </View>
          <View style={styles.dateAndhour}>
            <Text style={styles.date}>{props.date}</Text>
            <View style={styles.twoHour}>
              <Text style={styles.hour}>
                {props.startHours}h{props.startMinutes}-
              </Text>
              <Text style={styles.hour}>
                {props.endHours}h{props.endMinutes}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",

    width: "100%",
    height: "20%",
  },
  header: {
    height: "18%",
    width: "100%",
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  allText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "5%",
    height: "50%",
  },
  sessionName: {
    color: "#646262",
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,

    height: 40,
  },
  sessionNametitle: {
    color: "#646262",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  spotAndmaps: {
    marginLeft: "3%",
    display: "flex",
    justifyContent: "space-between",
  },
  spot: {
    color: "#646262",

    fontSize: 10,
  },
  maps: {
    color: "#646262",
    fontSize: 10,
  },
  dateAndhour: {
    marginRight: "3%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  date: {
    color: "#646262",
    fontSize: 10,
  },

  twoHour: {
    color: "#646262",
    display: "flex",
    flexDirection: "row",
  },
  hour: {
    color: "#646262",
    fontSize: 10,
  },
  back: {
    width: 20,
    height: 20,
    tintColor: "#646262",
    marginTop: 20,
  },
});
