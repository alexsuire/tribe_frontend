import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/users";

export default function SigninScreen({ navigation }) {
  const dispatch = useDispatch();
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [wrongUserInformations, setWrongUserInformations] = useState(false);

  const handleSubmitHome = () => {
    fetch("http://10.33.210.6:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signinEmail,
        password: signinPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          navigation.navigate("TabNavigator");
          setWrongUserInformations(false);
        } else {
          setWrongUserInformations(true); 
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Tribe</Text>
      <Text style={styles.titlesignup}>Signin</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(value) => setSigninEmail(value)}
        value={signinEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setSigninPassword(value)}
        value={signinPassword}
        style={styles.input}
      />
     { wrongUserInformations && <Text style={styles.wrongInfos}>Email or password is invalid</Text> }

      <TouchableOpacity
        onPress={() => handleSubmitHome()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Suivant</Text>
      </TouchableOpacity>
      <Text>Forgot password ?</Text>
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
    fontWeight: "100",
    color: "Black",
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
    width: "50%",
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
  wrongInfos: {
    marginTop: 10,
    color: "red"
  }
});
