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
import My_next_session from "../components/My_next_session";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.water}
        source={require("/Users/tim/Desktop/Tribe/tribe_frontend/assets/wave.png")}
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
