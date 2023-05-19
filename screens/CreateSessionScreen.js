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
  
  
  
  
  export default function CreateSessionScreen({ navigation }) {

    const [sessionName, setSessionName] = useState("");
    const [spot, setSpot] = useState("");
  
  
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >        
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => navigation.navigate('SessionScreen')}>
            <Image style={styles.back} source={require("../assets/back.png")} />
        </TouchableOpacity>
          <Text style={styles.title}>Create Your sessions</Text>
        </View>
        <View style={styles.body}>
        <View style={styles.content}>
            <View style={styles.namesession}>
                <Text style={styles.sessionde}>Name Session :</Text>
                <TextInput
                placeholder="..."
                id="Name session"
                style={styles.spot}
                value={sessionName}
                onChangeText={setSessionName}
                />
            </View>
            <View style={styles.namesession}>
                <Text style={styles.sessionde}>Spot :</Text>
                <TextInput
                placeholder="..."
                id="Name session"
                style={styles.spot}
                value={spot}
                onChangeText={setSpot}
                />
            </View>
            <Button title="Next" 
                onPress={() => { 
                    if (sessionName !== "" && spot !== "") {
                        navigation.navigate("CreateSessionDateScreen");
                    } else {
                        alert('Please complete your session Bodhi 🤙')
                    }
                }}
                style={styles.next}
            />
          </View>
        </View>
        </KeyboardAvoidingView>

    );
  }
  
  const styles = StyleSheet.create({
    container: {
    flex: 1,
        backgroundColor: "#E0CDA9",
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
    back:{
        width: 25,
        height: 25,
        tintColor: '#0487D9',
        marginLeft: 20,
        marginRight: 30,
      },
      
    title: {
        fontSize: 25,
        fontWeight: 500,
        color: "#0487D9",
    },
    body: {
        display: "flex",
        alignItems: "center",
    },
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#F0F0F0",
        height: "85%",
        width: "90%",
        marginTop: 10,
        borderRadius: 10,
    },
    namesession: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        marginBottom: 50,

    },
      sessionde:{
        margin: 15,
        fontSize: 15,
        fontWeight: 500,
      },
   
      spot:{
        borderBottomColor: '#16A1F7',
        borderBottomWidth: 1,
        borderRadius: 5,
        width: '50%',
        height: 30,
        marginLeft: 5,
        textAlign: 'center',

      },
   
  });