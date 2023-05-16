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

  
  
  export default function Signup_level({ navigation }) {

    const dispatch = useDispatch();
    const [signupLevel, setSignupLevel] = useState('');
  

    const handleRegisterSignUp = () => {
        dispatch(login({ level: signupLevel}));
        navigation.navigate('TabNavigator');
        setSignupLevel('');
    }
    const user = useSelector((state) => state.users.value)
    console.log('users', user)

return ( 
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}> 
        <Text style={styles.title}>Tribe</Text>
        <TextInput placeholder="Level" id="signupLevel" onChangeText={(value) => setSignupLevel(value)} value={signupLevel} style={styles.input} />

        <TouchableOpacity onPress={handleRegisterSignUp} style={styles.button} activeOpacity={0.8}>
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