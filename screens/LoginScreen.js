import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
  } from "react-native";

  
  export default function LoginScreen({ navigation }) {

    const SignupScreen = () => {
        // dispatch(updateNickname(nickname));
        navigation.navigate('Signup');
      };
      const SigninScreen = () => {
        // dispatch(updateNickname(nickname));
        navigation.navigate('Signin');
      };
      const handleSubmitHome = () => {
        // dispatch(updateNickname(nickname));
        navigation.navigate('TabNavigator');
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tribe</Text> 
                <TouchableOpacity onPress={SignupScreen} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={SigninScreen} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Signin</Text>
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
        color: '#0287D9',
        borderColor: 'black',
        borderBottomWidth: 2,
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
});