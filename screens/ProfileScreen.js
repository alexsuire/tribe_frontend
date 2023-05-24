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
        <Text style={styles.information}>Informations sur le Bodhi</Text>
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
          <Text style={styles.textinfobasic}>Spots Favorit : </Text>
        </View>
          <View style={styles.textspot}>
          {userData?.spots?.map((spot) => (
            <Text style={[styles.onetextspot, styles.textWithBorderBottom]} key={spot._id}>{spot.name}</Text>
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
  },
  menu:{
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontSize: 35,
    fontWeight: '600',
    color: '#0487D9',

  },
  information:{
    margin: '5%',
    color: '#0487D9',
  },
  body:{
    backgroundColor: '#E0CDA9',
    width: '80%',
    height: '80%',
    borderRadius: 10,
  
  },
  infobasic:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    margin: 10,
    
  },
  infobasicspot:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    margin: 10,

  },
  textinfobasiccontainer:{
    display: 'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',


  },
  textinfobasic:{
    fontSize: 15,
    fontWeight: "600",
    color: '#0487D9'
  },
  textContainer:{
    borderRadius: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    marginTop: 5,
    marginLeft: 5,
    textAlign:'center',
    padding: '3%',

  },

  textspot:{
    borderRadius: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    display: 'flex',
    // flexDirection: 'row',
    marginTop: 5,
    padding: '3%',
  },
  onetextspot:{
    margin: "2%",
  },
  textWithBorderBottom: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },

});