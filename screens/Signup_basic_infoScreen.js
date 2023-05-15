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
  import React, { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux'
  import { login } from '../reducers/users';
//   import {useSelector} from 'react-redux';

  
  
  export default function Signup_basic_infoScreen({ navigation }) {

    const dispatch = useDispatch();
    const [signupFirstname, setSignupFirstname] = useState('');
    const [signupLastname, setSignupLastname] = useState('');
    const [signupAge, setSignupAge] = useState('');

    const handleRegisterSignUp = () => {
        dispatch(login({ email: signupEmail, password: signupPassword}));
        navigation.navigate('Signup_basic_info');
        setSignupFirstname('');
        setSignupLastname('');
        setSignupAge('');
    }
    // const user = useSelector((state) => state.users.value)
    // console.log('users', user)

return ( 
    <View style={styles.container}>
        <Text style={styles.title}>Tribe</Text>
        <Text style={styles.titlesignup}>Signup</Text>
        <TextInput placeholder="Firstname" id="signupFirstname" onChangeText={(value) => setSignupFirstname(value)} value={signupFirstname} style={styles.input} />
        <TextInput placeholder="Lastname" id="signupLastname" onChangeText={(value) => setSignupLastname(value)} value={signupLastname} style={styles.input} />
        <TextInput placeholder="Age" id="signupAge" onChangeText={(value) => setSignupAge(value)} value={signupAge} style={styles.input} />

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