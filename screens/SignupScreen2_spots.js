  import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import Favorite_spots_signup from "../components/Favorite_spots_signup";
  import MY_FETCH_API from "../myfetchapi";


  export default function SignupScreen2_spots({ navigation }) {
    const dispatch = useDispatch();
    const [spotsFetched, setSpotsFetched] = useState([]);
    const count = useSelector((state) => state.count.value);
    const [checkedCount, setCheckedCount] = useState(0);


    // Fonction qui fetch les spots à chaque chargement de la page et les ajoute dans la variable spotsFetched
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(MY_FETCH_API + "/spots");
          const json = await response.json();
          const data = json.data;
          setSpotsFetched(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);


    // Fonction qui map sur les spots fetché au dessus pour return le composant Favorite_spots_signup et les ajoute dans la variable favspot
    const favspot =
      spotsFetched.length > 0
        ? spotsFetched.map((data, i) => <Favorite_spots_signup key={i} {...data}  checkedCount={checkedCount}
        setCheckedCount={setCheckedCount} />)
        : null;

    // Au clic sur suivant, redirige vers la page signup finale
    const handleRegisterSignUp = () => {
      navigation.navigate("Signup3_final");
    };
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>Choose up to 3 favorite spots</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.spots}>{favspot}</View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleRegisterSignUp}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    scrollView: {
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
    title: {
      fontSize: 25,
      fontWeight: 700,
      marginTop: 20,
    },
    input: {
      borderColor: "gr",
      borderRadius: 6,
      borderWidth: 1,
      width: "85%",
      height: "20%",
    },
    textinput: {
      margin: 5,
      fontSize: 16,
    },

    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40%",
      height: "10  %",
      backgroundColor: "#0287D9",
      borderRadius: 10,
      margin: 10,
    },
    textButton: {
      color: "#ffffff",
      fontWeight: "600",
      fontSize: 23,
    },
  });
