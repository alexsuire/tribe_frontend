import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { incrementCount } from "../reducers/count";
import { decrementCount } from "../reducers/count";
import { selectSpot } from "../reducers/count";
import { deselectSpot } from "../reducers/count";
import { AddFavoriteSpot,RemoveFavoriteSpot } from "../reducers/users"

export default function Favorite_spots_signup(props) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const user= useSelector((state) => state.users.value);

  console.log(user)


  const onPress = () => {
    if (checked) {
      setChecked(!checked);
      props.setCheckedCount( props.checkedCount-1)
      dispatch(RemoveFavoriteSpot(props._id))

    } else if (props.checkedCount < 3) {
      setChecked(!checked);
      props.setCheckedCount( props.checkedCount +1)
      dispatch(AddFavoriteSpot(props._id))
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.opacity}
        onPress={onPress}
        disabled={props.checkedCount >= 3 && !checked}
      >
        <ImageBackground
          source={require("../assets/favoriteSpotsImage.jpg")}
          resizeMode="cover"
          style={styles.image}
          
        >
          <View style={styles.propertyimage}>
            <View style={styles.check}> 
              {checked && (
                <MaterialCommunityIcons name="check" color="green" size={20} />
              )}
            </View>
            <View style={styles.name}>
              <Text style={styles.propertyname}>{props.name}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "45%",
  },
  image: {
    width: "100%",
    height: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  opacity: {
    backgroundColor: "#E0CDA9",
  },
  propertyimage:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: '30%',
  },
  check:{
    backgroundColor: 'white',
    borderRadius: 50,
    height: 20,
    margin: 5,
    width: 20,
    marginLeft: 130,
  },
 name:{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
 },
  propertyname:{
    color: "black",
    fontSize: 20,
    fontWeight: 600,
  },
});
