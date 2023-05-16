import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, View
  } from "react-native";
  import { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux'
  import { logout } from '../reducers/users';
 

  
  export default function SigninScreen({ navigation }) {
    const dispatch = useDispatch();

    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setSigninPassword] = useState('');

    const handleSubmitHome = () => {
        dispatch(logout({ email: signinEmail, password: signinPassword}));
        navigation.navigate('TabNavigator');
    }

    return ( 
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}> 
        <Text style={styles.title}>Tribe</Text>
        <Text style={styles.titlesignup}>Signin</Text>
        <TextInput placeholder="Email" onChangeText={(value) => setSigninEmail(value)} value={signinEmail} style={styles.input} />
        <TextInput placeholder="Password" onChangeText={(value) => setSigninPassword(value)} value={signinPassword} style={styles.input} />

        <TouchableOpacity onPress={() => handleSubmitHome()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Suivant</Text>
        </TouchableOpacity>
        <Text>Forgot password ?</Text>
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
        color: 'Black',
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