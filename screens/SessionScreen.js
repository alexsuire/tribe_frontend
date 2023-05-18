import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SessionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0CDA9",
  },
  header: {
    height: "30%",
    backgroundColor: "#F0F0F0",
  },
});
