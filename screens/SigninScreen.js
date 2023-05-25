import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../reducers/users";
import Ionicons from "react-native-vector-icons/Ionicons";
import MY_FETCH_API from "../myfetchapi";

export default function SigninScreen({ navigation }) {
  const dispatch = useDispatch();
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [wrongUserInformations, setWrongUserInformations] = useState(false);


  const handleSubmitHome = () => {
    fetch(MY_FETCH_API + "/users/signin", {
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
          dispatch(addToken(data.token));
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

  // Fonction pour la gestion de l'affichage du mot de passe via une icon eye

  const renderPasswordVisibilityButton = () => (
    <TouchableOpacity
      style={styles.togglePasswordButton}
      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
    >
      <Ionicons
        name={isPasswordVisible ? "eye" : "eye-off"}
        size={20}
        color="#007AFF"
      />
    </TouchableOpacity>
  );

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
        style={styles.inputemail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          onChangeText={(value) => setSigninPassword(value)}
          value={signinPassword}
          style={styles.inputpassword}
          secureTextEntry={!isPasswordVisible}
        />
        {renderPasswordVisibilityButton()}
      </View>
      {wrongUserInformations && (
        <Text style={styles.wrongInfos}>Email or password is invalid</Text>
      )}

      <TouchableOpacity
        onPress={() => handleSubmitHome()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Next</Text>
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
    fontWeight: "100",
    color: "black",
    marginBottom: 20,
  },
  inputemail: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    height: 45,
    marginTop: 15,
    borderRadius: 7,
    borderColor: "#E0CDA9",
  },
  inputpassword: {
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
  wrongInfos: {
    marginTop: 10,
    color: "red",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  togglePasswordButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E0CDA9",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 30,
    marginTop: 15,
    marginLeft: 8,
  },
});

