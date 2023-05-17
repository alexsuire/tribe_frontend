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
import Header_spot from "../components/Header_spot";
import NextSessions_spot from "../components/NextSessions_spot";
import Forecast_spot from "../components/Forecast_spot";

export default function SpotScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header_spot />
      <ImageBackground
        style={styles.wave2}
        source={require("../assets/wavesfinal.png")}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.all}>
            <NextSessions_spot />
            <Forecast_spot />
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
    width: "100%",
  },
  scrollView: {
    paddingBottom: 320,
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
