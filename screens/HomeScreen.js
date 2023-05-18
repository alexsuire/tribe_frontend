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
} from "react-native";
import My_next_session from "../components/NextSession_home";
import { useDispatch, useSelector } from 'react-redux';




export default function HomeScreen({ navigation }) {



  const user = useSelector((state) => state.users.value);
  console.log(user)


  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.water}
        source={require("../assets/wave.png")}
      >
        <SafeAreaView style={styles.components}>
          <My_next_session />
        </SafeAreaView>
      </ImageBackground>
    </View>
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
