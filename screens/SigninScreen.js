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

  
  export default function SigninScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return ( 
        <View style={styles.container}>
        <Text style={styles.title}>Tribe</Text>
        <Text style={styles.titlesignup}>Signin</Text>
        <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
        <TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />

        <TouchableOpacity onPress={() => handleSubmitHome()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Suivant</Text>
        </TouchableOpacity>
        <Text>Forgot password ?</Text>
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