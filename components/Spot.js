import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {addActive_spot} from "../reducers/users"
import { useDispatch, useSelector } from "react-redux";



export default function Spot(props) {
  const dispatch = useDispatch();



  const navigation = useNavigation();

  function handlePress() {

    dispatch(addActive_spot(props._id))
    navigation.navigate("SpotScreen")
  }
  
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View style={styles.container}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.region}>{props.region}</Text>
        <Text style={styles.type}>{props.type}</Text>
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
