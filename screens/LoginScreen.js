import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";

  
  export default function LoginScreen({ navigation }) {

    const handleSubmit = () => {
        // dispatch(updateNickname(nickname));
        navigation.navigate('TabNavigator');
      };

    return (
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Go to map</Text>
        </TouchableOpacity>
    );
  }
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});