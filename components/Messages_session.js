import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import MY_FETCH_API from "../myfetchapi";
import { useDispatch, useSelector } from "react-redux";

export default function Messages_session(props) {
  const [message, setMessage] = useState("");
  const [userInformations, setUserInformations] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageSend, setMessageSend] = useState(false);
  const scrollViewRef = useRef(null);
  const user = useSelector((state) => state.users.value);
  const [contentHeight, setContentHeight] = useState(0);

  // faire en sorte d'arriver sur les derniers messages
  const handleContentSizeChange = (contentWidth, height) => {
    if (scrollViewRef.current && height > contentHeight) {
      scrollViewRef.current.scrollToEnd({ animated: false });
      setContentHeight(height);
    }
  };

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
    setMessageSend(!messageSend);
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
  }, [messageSend]);

  let messageViews;
  if (messages) {
    messageViews = messages.map((data, i) => {
      const messageDate = new Date(data.date);
      const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
      const formattedDate = `${messageDate.getDate()}/${month}/${messageDate.getFullYear()}`;

      return (
        <View key={i} style={styles.message}>
          <Text style={styles.messageText}>{data.text}</Text>
          <View style={styles.nameAnddate}>
            <Text style={styles.messageUser}>{data.user?.firstname}</Text>
            <Text style={styles.messageDate}>{formattedDate}</Text>
          </View>
        </View>
      );
    });
  } else {
    messageViews = (
      <Text style={styles.noMessagesText}>No messages available.</Text>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={handleContentSizeChange}
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
    maxHeight: 350,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  messageText: {
    fontSize: 10,
    color: "black",
    width: 250,
  },
  noMessagesText: {
    color: "#646262",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  nameAnddate: {
    width: 100,
    marginLeft: 5,
  },
  messageUser: { fontSize: 9 },
  messageDate: { fontSize: 7 },
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
