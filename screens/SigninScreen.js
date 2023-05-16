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

    const handleForgotPassword = () => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'votre_email@gmail.com',
            pass: 'votre_mot_de_passe'
          }
        });
    
        const mailOptions = {
          from: 'votre_email@gmail.com',
          to: signinEmail,
          subject: 'Mot de passe oublié',
          text: `Votre mot de passe : ${signinPassword}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
              console.log('E-mail envoyé avec succès :', info.response);
            }
        });
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
        <TouchableOpacity onPress={() => handleForgotPassword()}>
            <Text>Forgot password ?</Text>
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
        borderColor: '#E0CDA9',

    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
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
});