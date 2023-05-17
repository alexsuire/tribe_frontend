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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginBasicScreen } from "../reducers/users";

export default function Signup_basic_infoScreen({ navigation }) {
  const dispatch = useDispatch();
  const [signupFirstname, setSignupFirstname] = useState("");
  const [signupLastname, setSignupLastname] = useState("");
  const [signupAge, setSignupAge] = useState("");

  // Au clic sur le bouton "suivant", enregistre le prénom, nom, age en BDD et redirige vers la page signup de choix des spots
  const handleRegisterSignUp = () => {
    dispatch(
      loginBasicScreen({
        firstname: signupFirstname,
        lastname: signupLastname,
        age: signupAge,
      })
    );
    navigation.navigate("Signup2_spots");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Tribe</Text>
      <TextInput
        placeholder="Firstname"
        id="signupFirstname"
        onChangeText={(value) => setSignupFirstname(value)}
        value={signupFirstname}
        style={styles.input}
      />
      <TextInput
        placeholder="Lastname"
        id="signupLastname"
        onChangeText={(value) => setSignupLastname(value)}
        value={signupLastname}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        id="signupAge"
        onChangeText={(value) => setSignupAge(value)}
        value={signupAge}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={handleRegisterSignUp}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Suivant</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#0287D9",
    marginBottom: 20,
  },
  titlesignup: {
    fontSize: 30,
    fontWeight: "700",
    color: "black",
    marginBottom: 20,
  },
  input: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    height: 45,
    marginTop: 15,
    borderRadius: 7,
    borderColor: "#E0CDA9",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "8%",
    marginTop: 30,
    backgroundColor: "#0287D9",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 23,
  },
});
