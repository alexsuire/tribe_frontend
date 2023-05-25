import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, View
} from "react-native";
import MY_FETCH_API from "../myfetchapi";
import { useSelector } from "react-redux";



export default function ProfileScreen({ navigation }) {

  const [userData, setUserData] = useState([]);


  const user = useSelector((state) => state.users.value);



  useEffect(() => {
    const fetchUserData= async () => {
      try {
        const response = await fetch(MY_FETCH_API + `/users/basicInfo/${user.token}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
    console.log('data', userData)
  }, []);
  console.log('usertoken', user.token)

 
 

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.information}>Information about the Bodhi</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.infobasic}>
          <View style={styles.textinfobasiccontainer}>
          <Text style={styles.textinfobasic}>FirstName :</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{userData?.firstname}</Text>
          </View>
        </View>
        <View style={styles.infobasic}>
        <View style={styles.textinfobasiccontainer}>
          <Text style={styles.textinfobasic}>LastName :</Text>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.text}>{userData?.lastname}</Text>
          </View>
        </View>
        <View style={styles.infobasic}>
        <View style={styles.textinfobasiccontainer}>
          <Text style={styles.textinfobasic}>Age :</Text>
          </View>
          <View style={styles.textContainer} >
          <Text style={styles.text}>{userData?.age}</Text>
          </View>
        </View>
        <View style={styles.infobasic}>
        <View style={styles.textinfobasiccontainer}>
          <Text style={styles.textinfobasic}>Email :</Text>
          </View>
          <View style={styles.textContainer} >
          <Text style={styles.text}>{userData?.email}</Text>
          </View>
        </View>
        <View style={styles.infobasic}>
        <View style={styles.textinfobasiccontainer}>
          <Text style={styles.textinfobasic}>Nationalities :</Text>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.text}>{userData?.nationalities?.country}</Text>
          </View>
        </View>
        <View style={styles.infobasic}>
        <View style={styles.textinfobasiccontainer}>
          <Text style={styles.textinfobasic}>Level :</Text>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.text}>{userData?.level}</Text>
          </View>
        </View>
        <View style={styles.infobasicspot}>
        <View style={styles.textinfobasiccontainer}>
          <Text style={styles.textinfobasic}>Favorite spots : </Text>
        </View>
          <View style={styles.textContainer}>
          {userData?.spots?.map((spot) => (
            <Text style={styles.text} key={spot._id}>{spot.name}   </Text>
          ))}
           
          </View>
        </View>
      </View>
    </View >
  );
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  menu:{
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontSize: 35,
    fontWeight: '600',
    color: '#F2CB05',
  },
  information:{
    marginBottom: '5%',
    color: '#E0CDA9',
    
  },
  // body:{
  //   backgroundColor: '#0487D9',
  //   width: '80%',
  //   height: '70%',
  //   borderRadius: 10,
  // },
  infobasic:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    margin: 10,
    backgroundColor: '#0487D9',
    borderRadius: 10,
    shadowColor: "#E0CDA9",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
  },
  infobasicspot:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    backgroundColor: '#0487D9',
    borderRadius: 10,
    margin: 10,
    shadowColor: "#E0CDA9",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,

  }, 
 
  textinfobasiccontainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  textinfobasic:{
    fontSize: 15,
    fontWeight: "600",
    color: '#5FB6DA',
  },
  textContainer:{
    textAlign:'center',
    padding: '3%',
  },
  text:{
    color: 'white',
  },


});