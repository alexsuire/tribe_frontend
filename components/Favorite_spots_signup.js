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
import { setCount } from "../reducers/count";

export default function Favorite_spots_signup(props) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();


  const { checkedCount, selectedSpots } = useSelector((state) => state.count);

  console.log(count)


  const onPress = () => {
    if (checked) {
      setChecked(false);
      dispatch(decrementCount());
      dispatch(deselectSpot(props.id));
    } else if (checkedCount < 3) {
      setChecked(true);
      dispatch(incrementCount());
      dispatch(selectSpot(props.id));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.opacity}
        onPress={onPress}
        disabled={checkedCount >= 3 && !checked}
      >
        <ImageBackground
          source={require("../assets/favoriteSpotsImage.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text>{props.name}</Text>
          {checked && (
            <MaterialCommunityIcons name="check" color="green" size="30%" />
          )}
          {!checked && (
            <MaterialCommunityIcons name="check" color="black" size="30%" />
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "40%",
    height: "25%",
  },
  image: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  opacity: {
    backgroundColor: "black",
  },
});
