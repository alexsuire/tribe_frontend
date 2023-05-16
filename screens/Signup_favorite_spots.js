import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, ScrollView, SafeAreaView, StatusBar
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Favorite_spots_signup from "../components/Favorite_spots_signup";

export default function Signup_favorite_spots({ navigation }) {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [spots, setSpots] = useState([]);
  const [regionSpot, setRegionSpot] = useState('');


  const count = useSelector((state) => state.count.value);

  console.log("count", count);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.33.210.115:3000/spots");
        const json = await response.json();
        const data = json.data;
        setSpots(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(spots);

  const favspot =
    spots.length > 0
      ? spots.map((data, i) => <Favorite_spots_signup key={i} {...data} />)
      : null;

      
  const handleRegisterSignUp = () => {
    navigation.navigate('Signup_level');
  }
  return (
    <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>
            Choose up to 3 favorite spots
          </Text>
          {/* <View style={styles.input} >
            <TextInput placeholder="Search to spot" onChangeText={(value) => setRegionSpot(value)} value={regionSpot} style={styles.textinput} />
          </View> */}
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.spots}>{favspot}</View>
        </ScrollView>
        <TouchableOpacity onPress={handleRegisterSignUp} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Suivant</Text>
        </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView:{
    flex: 1,
    height: "100%",
  },
  spots: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "20%",
    width: "100%",
  },
  title:{
    fontFamily: "Lato-Bold",
    fontSize: 25,
    fontWeight: 700,
    marginTop: 20,
  },
  input:{
    borderColor: "gr",
    borderRadius: 6,
    borderWidth: 1,
    width: "85%",
    height: "20%",
  },
  textinput:{
    margin: 5,
    fontSize: 16,
  },
  
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '10  %',
    backgroundColor: '#0287D9',
    borderRadius: 10,
    margin: 10,
  },  
  textButton: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 23,      
  },
});
