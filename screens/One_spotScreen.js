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
          <View style={styles.all}>
            <Next_session_one_spot />
            <Forecast_one_spot />
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>See more</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
  },
  wave2: {
    height: 800,
    width: 500,
  },
  scrollView: {
    paddingBottom: 250,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    height: "7%",
    marginTop: 20,
    backgroundColor: "#5FB6DA",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: { color: "#ffffff", fontWeight: "600", fontSize: 14 },
  all: { display: "flex", flexDirection: "column", alignItems: "center" },
});