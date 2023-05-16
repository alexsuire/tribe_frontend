import React, { useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/users';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export default function Signup_level({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [nationalities, setNationalities] = useState([]);
  const [signupLevel, setSignupLevel] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/nationalities/allCountries');
        const json = await response.json();
        const data = json.data;
        setNationalities(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

const countryNames = nationalities.map((item) => item.country)


  
  const transformedCountries = countryNames.map((country, index) => {
    return {
      id: index + 1,
      title: country
    };
  });
  
  console.log(transformedCountries);
  

  const handleRegisterSignUp = () => {
    dispatch(login({ level: signupLevel }));
    navigation.navigate('TabNavigator');
    setSignupLevel('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>Tribe</Text>
      <TextInput
        placeholder="Level"
        id="signupLevel"
        onChangeText={(value) => setSignupLevel(value)}
        value={signupLevel}
        style={styles.input}
      />
 <AutocompleteDropdown
  clearOnFocus={false}
  closeOnBlur={true}
  closeOnSubmit={false}
  initialValue={{ id: '2' }} 
  onSelectItem={setSelectedItem}
  dataSet={transformedCountries}
  containerStyle={{
    width: '80%',
    backgroundColor: 'white', // Set background color to white
    borderColor: '#E0CDA9', // Set border color to black
    borderWidth: 1, // Optional: Set border width
    borderRadius: 7, // Optional: Set border radius
  }}

/>
      <TouchableOpacity onPress={handleRegisterSignUp} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Suivant</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '700',
    color: '#0287D9',
    marginBottom: 20,
  },
  input: {
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    height: '7%',
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
});
