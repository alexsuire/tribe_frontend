import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function HomeScreen({ navigation }) {
  const [nickname, setNickname] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={{ fontFamily: "Lato-Bold" }}>
        Choose up to 3 favorite spots
      </Text>
      <TextInput
        placeholder="Nickname"
        onChangeText={(value) => setNickname(value)}
        value={nickname}
        style={styles.input}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
