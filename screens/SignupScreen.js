import React, { useState, useEffect } from 'react';
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
  import Ionicons from 'react-native-vector-icons/Ionicons';

  
  export default function SignupScreen({ navigation }) {

    const dispatch = useDispatch();
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        if (isFormValid && isEmailValid) {
          dispatch(login({ email: signupEmail, password: signupPassword }));
          navigation.navigate('Signup_basic_info');
          setSignupEmail('');
          setSignupPassword('');
        }
      };

    const validateForm = () => {
        if (signupEmail.trim() !== '' && signupPassword.trim() !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };
        
        useEffect(() => {
        validateForm();
        }, [signupEmail, signupPassword]);

    const validateEmail = () => {
    const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsEmailValid(emailRegex.test(signupEmail));
    };
    
    useEffect(() => {
    validateEmail();
    }, [signupEmail]);

    const renderPasswordVisibilityButton = () => (
        <TouchableOpacity
          style={styles.togglePasswordButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color="#007AFF"
          />
        </TouchableOpacity>
      );

    return ( 
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text style={styles.title}>Tribe</Text>
        <Text style={styles.titlesignup}>Signup</Text>
        <TextInput placeholder="Email" id="signupEmail" onChangeText={(value) => setSignupEmail(value)} value={signupEmail} style={[styles.inputemail, !isEmailValid && styles.invalidInput,]} />
        <View style={styles.passwordContainer}>
        <TextInput placeholder="Password" id="signupPassword" onChangeText={(value) => setSignupPassword(value)} value={signupPassword} style={styles.inputpassword} secureTextEntry={!isPasswordVisible}  />
        {renderPasswordVisibilityButton()}
        </View>
        <TouchableOpacity onPress={handleRegisterSignUp} style={[styles.button, !isFormValid && styles.disabledButton]} disabled={!isFormValid} activeOpacity={0.8}>                
            <Text style={styles.textButton}>Suivant</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>
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
        color: '#0287D9',
        marginBottom: 20,
    },
    titlesignup:{
        fontSize: 30,
        fontWeight: "100",
        color: 'black',
        marginBottom: 20,
    },
    inputemail:{
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        width: "90%",
        height: 45,
        marginTop: 15,
        borderRadius: 7,
        borderColor: '#E0CDA9',
    },
    inputpassword:{
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        width: "80%",
        height: 45,
        marginTop: 15,
        borderRadius: 7,
        borderColor: '#E0CDA9',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '8%',
        marginTop: 30,
        backgroundColor: '#0287D9',
        borderRadius: 10,
        marginBottom: 10,
    },
    textButton: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 23,      
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    invalidInput: {
    borderColor: 'red',
    borderWidth: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        },
    togglePasswordButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E0CDA9',
        borderWidth: 1,
        borderRadius: 5,
        height: 30,
        width: 30,
        marginTop: 15,
        marginLeft: 8,
      },
    
});