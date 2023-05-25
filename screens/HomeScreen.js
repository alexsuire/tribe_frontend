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
  ScrollView,
} from "react-native";
import My_next_session from "../components/NextSession_home";
import SessionsAroundMe from "../components/SessionsAroundMe";
import { useDispatch, useSelector } from "react-redux";
import Favorite_spots_home from "../components/Favorite_spots_home";

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.users.value);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.water}
        source={require("../assets/wave.png")}
      >
        <SafeAreaView style={styles.components}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <My_next_session navigation={navigation} />
            <SessionsAroundMe navigation={navigation} />
            <Favorite_spots_home navigation={navigation} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",

    backgroundColor: "#E0CDA9",
  },
  water: {
    flex: 1,
  },
  text: {
    display: "flex",
  },
  components: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  scrollView: {
    paddingBottom: 300,
    width: 330,
  },
});
