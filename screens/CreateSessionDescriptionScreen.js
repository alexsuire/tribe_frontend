import React, { useState } from "react";
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
    SafeAreaView, ScrollView, Button
  } from "react-native";
  import { TouchableWithoutFeedback, Keyboard } from 'react-native';
  
  
  
  
  export default function CreateSessionDescriptionScreen({ navigation }) {
  
  
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('CreateSessionDateScreen')}>
                <Image style={styles.back} source={require("../assets/back.png")} />
              </TouchableOpacity>
              <Text style={styles.title}>Create Your sessions</Text>
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
                  />
                </ScrollView>
                <Button
                  title="Create"
                  onPress={() => navigation.navigate("CreateSessionDescriptionScreen")}
                  style={styles.next}
                />
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
      back:{
        width: 25,
        height: 25,
        tintColor: '#0487D9',
        marginLeft: 20,
        marginRight: 30,
      },
      scrollView: {
        maxHeight: 190, 
        borderRadius: 4, 
        width: '95%',
      },
      description:{
        height: 150,
        borderColor: '#16A1F7',
        borderWidth: 1,
        borderRadius: 5,
        margin: 8,
      },
      header: {
        height: "18%",
        width: "100%",
        backgroundColor: "#F0F0F0",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
      },
      title: {
        fontSize: 25,
        fontWeight: 500,
        color: "#0487D9",
      },
      body: {
        display: "flex",
        alignItems: "center",
        justifyContent:'center',
      },
      sessionde:{
        margin: 15,
        fontSize: 20,
        fontWeight: 500,
      },
      sessionsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#F0F0F0",
        height: "80%",
        width: "90%",
        marginTop: 10,
        borderRadius: 10,
      },
  });