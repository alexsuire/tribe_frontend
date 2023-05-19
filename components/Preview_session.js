import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function Session(props) {
  const navigation = useNavigation();
  console.log("props", props.spot.name);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SpotScreen")}>
      <View style={styles.container}>
        <Text style={styles.name}>{props.spot.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "92%",
    height: 70,
    backgroundColor: "white",
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
  region: { fontSize: 13, color: "#5FB6DA", fontWeight: 200 },
  type: { fontSize: 13, color: "#5FB6DA", fontWeight: 200 },
});
