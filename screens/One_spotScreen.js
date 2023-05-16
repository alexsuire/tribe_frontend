import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import Header_one_spot from "../components/Header_one_spot";
import Next_session_one_spot from "../components/Next_session_one_spot";
import Forecast_one_spot from "../components/Forecast_one_spot";

export default function One_spotScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header_one_spot />
      <ImageBackground
        style={styles.wave2}
        source={require("../assets/wavesfinal.png")}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <Next_session_one_spot />
            <Forecast_one_spot />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text>map</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  wave2: {
    height: 800,
    width: 500,
    right: 100,
  },
  scrollView: {
    paddingBottom: 250,
  },
  btn: {
    backgroundColor: "red",
    marginTop: 100,
  },
});
