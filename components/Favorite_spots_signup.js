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
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Favorite_spots_signup(props) {
  const [checked, setChecked] = useState(false);

  const onPress = () => setChecked(!checked);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={require("../assets/favoriteSpotsImage.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
 {checked && <MaterialCommunityIcons name="check" />}

          <Text>{props.name}</Text>
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
  },
});
