import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import MY_FETCH_API from "../myfetchapi";
import { useDispatch, useSelector } from "react-redux";

export default function Messages_session(props) {
  const [message, setMessage] = useState("");
  const [userInformations, setUserInformations] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          MY_FETCH_API + `/users/basicInfo/${user.token}`
        );
        const userinfo = await response.json();

        setUserInformations(userinfo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSend = async () => {
    if (message.trim() === "") {
      return;
    }

    const postMessage = await fetch(MY_FETCH_API + "/messages/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userInformations._id,
        text: message,
        sessionId: props.sessionId,
      }),
    });
    setMessage("");
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const messageResponse = await fetch(
          MY_FETCH_API + `/messages/getAllMessages/${user.session}`
        );

        const messageInfo = await messageResponse.json();
        console.log("messageInfo", messageInfo);
        setMessages(messageInfo.messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessage();
  }, []);

  const messageViews = messages.map((data, i) => (
    <View key={i} style={styles.message}>
      <Text style={styles.messageText}>{data.text}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messageViews}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "8%",
    width: "90%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  header: {
    display: "flex",
    backgroundColor: "#16A1F7",
    height: 60,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "3%",
    justifyContent: "space-around",
  },
  title: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  messagesContainer: {
    backgroundColor: "white",
    display: "flex",
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  message: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 10,
    color: "black",
  },
  inputContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: "#16A1F7",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
