import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, View
  } from "react-native";
  import { useDispatch, useSelector } from 'react-redux'
  import { login } from '../reducers/users';

  
  export default function SignupScreen({ navigation }) {

    const dispatch = useDispatch();
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

   console.log("email", signupEmail)

    // const handleRegisterSignUp = () => {
    //     fetch('http:////10.33.210.115:3000/users/signup', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    //     }).then(response => response.json())
    //         .then(data => {
    //             if (data.result) {
    //                 console.log(data)
    //                 dispatch(login({ email: signupEmail, token: data.token, firstname: data.firstname, lastname: data.lastname, age: data.age, password: signupPassword, level: data.level }));
    //                 navigation.navigate('Signup_basic_info');
    //             }
    //             setSignupEmail('');
    //             setSignupPassword('');

    //         });
    // };

        const handleRegisterSignUp = () => {
            dispatch(login({ email: signupEmail, password: signupPassword}));
            navigation.navigate('Signup_basic_info');
            setSignupEmail('');
            setSignupPassword('');
        }

    return ( 
    <View style={styles.container}>
        <Text style={styles.title}>Tribe</Text>
        <Text style={styles.titlesignup}>Signup</Text>
        <TextInput placeholder="Email" id="signupEmail" onChangeText={(value) => setSignupEmail(value)} value={signupEmail} style={styles.input} />
        <TextInput placeholder="Password" id="signupPassword" onChangeText={(value) => setSignupPassword(value)} value={signupPassword} style={styles.input} />

        <TouchableOpacity onPress={handleRegisterSignUp} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Suivant</Text>
        </TouchableOpacity>

    </View>
);
  }
  const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 50,
        fontWeight: "700",
        color: 'blue',
        marginBottom: 20,
    },
    titlesignup:{
        fontSize: 30,
        fontWeight: "700",
        color: 'black',
        marginBottom: 20,
    },
    input:{
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        width: "80%",
        height: "7%",
        marginTop: 15,
        borderRadius: 7,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '8%',
        marginTop: 30,
        backgroundColor: '#ec6e5b',
        borderRadius: 10,
        marginBottom: 10,
    },
    textButton: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 23,      
    },
});