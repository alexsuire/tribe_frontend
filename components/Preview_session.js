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

export default function Session(props) {
  const navigation = useNavigation();
  console.log("props", new Date(props.date_start).getHours());

  const startDateTime = new Date(props.date_start);
  const endDateTime = new Date(props.date_end);

  const startHours = startDateTime.getHours();
  const startMinutes = startDateTime.getMinutes();
  const endHours = endDateTime.getHours();
  const endMinutes = endDateTime.getMinutes();

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("SpotScreen")}>
        <View style={styles.container}>
          <Text style={styles.name}>{props.spot.name}</Text>
          <Text style={styles.hour}>
            {startHours} h {startMinutes}
          </Text>
          <Text style={styles.hour}>
            {endHours} h {endMinutes}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 8,
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
  hour: { fontSize: 13, color: "#5FB6DA", fontWeight: 200 },
});
