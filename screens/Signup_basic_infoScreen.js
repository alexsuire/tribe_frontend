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
  import { useDispatch, useSelector } from 'react-redux'
  import { login } from '../reducers/users';
  import {useSelector} from 'react-redux';

  
  
  export default function Signup_basic_infoScreen({ navigation }) {

    const dispatch = useDispatch();
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const user = useSelector((state) => state.users.value)
    console.log('users', user)

    return <Text style={styles.container}>yyeeeeegeggegegeggegeg</Text>;
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  });