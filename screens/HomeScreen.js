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
  SafeAreaView,
  ScrollView
} from "react-native";
import My_next_session from "../components/NextSession_home";
import SessionsAroundMe from "../components/SessionsAroundMe";
import { useDispatch, useSelector } from "react-redux";
import Favorite_spots_home from "../components/Favorite_spots_home";

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.users.value);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.water}
        source={require("../assets/wave.png")}
      >
        <SafeAreaView style={styles.components}>
          <My_next_session navigation={navigation}/>
        <SessionsAroundMe navigation={navigation}/>
        <Favorite_spots_home navigation={navigation}/>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0CDA9",
  },
  water: {
    width: "100%",
    height: "80%",
  },
  text: {
    display: "flex",
  },
  components: {
    display: "flex",
    alignItems: "center",
  },
});
