import React, { useEffect, useState } from "react";
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
  Button,
} from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addSessionDescription } from "../reducers/session";
import MY_FETCH_API from "../myfetchapi";
import { addSession } from "../reducers/users";

export default function CreateSessionDescriptionScreen({ navigation }) {
  const [description, setDescription] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.value);
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          MY_FETCH_API + `/users/basicInfo/${user.token}`
        );
        const userfetch = await response.json();
        setUserInfo(userfetch);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleCreateSession = () => {
    dispatch(addSessionDescription(description)); // Dispatchez l'action pour mettre à jour la description de la session

    fetch(MY_FETCH_API + "/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session.sessionName,
        spot: session.spot,
        admin: userInfo._id,
        date_start: session.start,
        date_end: session.end,
        description: description,
      }),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        dispatch(addSession(data.id));

        fetch(MY_FETCH_API + `/users/session/${userInfo._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session: data.id }),
        });

        fetch(MY_FETCH_API + `/spots/${session.spot}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session: data.id }),
        });
      });

    navigation.navigate("SessionScreen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateSessionDateScreen")}
            >
              <Image
                style={styles.back}
                source={require("../assets/back.png")}
              />
            </TouchableOpacity>
            <View style={styles.placetitle}>
              <Text style={styles.title}>Create Your sessions</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sessionsContainer}>
              <Text style={styles.sessionde}>Description:</Text>
              <ScrollView
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
              >
                <TextInput
                  placeholder="..."
                  id="description"
                  style={styles.description}
                  multiline={true}
                  numberOfLines={4}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
              </ScrollView>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateSession}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0CDA9",
  },
  back: {
    width: 25,
    height: 25,
    tintColor: "#0487D9",
  },
  scrollView: {
    maxHeight: 190,
    borderRadius: 4,
    width: "95%",
  },
  description: {
    height: 150,
    borderColor: "#16A1F7",
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
  },
  header: {
    height: "18%",
    width: "100%",
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  placetitle: {
    width: "80%",
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: 300,
    color: "#0487D9",
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sessionde: {
    margin: 15,
    fontSize: 20,
    fontWeight: 500,
  },
  sessionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    height: "80%",
    width: "90%",
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#0487D9",
    fontSize: 19,
    fontWeight: "600",
  },
});
