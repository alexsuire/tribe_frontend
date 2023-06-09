import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginCountry, addToken } from "../reducers/users";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import MY_FETCH_API from "../myfetchapi";
import { SelectList } from "react-native-dropdown-select-list";

export default function SignupScreen3_final({ navigation }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nationalities, setNationalities] = useState([]);
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  // Fetch les pays en BDD au chargement de la page
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          MY_FETCH_API + "/nationalities/allCountries"
        );
        const json = await response.json();
        const data = json.data;
        setNationalities(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  // Map sur les pays pour récupérer seulement les noms de chaque et les ajoute dans la variable countryNames
  const countryNames = nationalities.map((item) => item.country);

  // Map sur le nom des pays et crée un nouvel objet transformedCountries {id : index i, title: countryName}
  const transformedCountries = countryNames.map((country, index) => {
    return {
      id: index + 1,
      title: country,
    };
  });

  //Au clic sur le bouton suivant : fetch la route qui retrouve un pays via son nom et renvoie son _ID, puis fetch la route qui crée un nouvel utilisateur en BDD

  const CreateNewUser = async () => {
    try {
      const response = await fetch(
        MY_FETCH_API + `/nationalities/oneCountry/${selectedCountry.title}`
      );
      const data = await response.json();
      dispatch(loginCountry(data.data._id));

      // Exécuter le deuxième fetch seulement si le premier fetch a renvoyé des données
      const secondResponse = await fetch(MY_FETCH_API + "/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
          password: user.password,
          level: selectedLevel,
          nationalities: user.country,
          spots: user.spots,
        }),
      });
      const responseData = await secondResponse.json();
      console.log("response", responseData)
      dispatch(addToken(responseData.token));
      navigation.navigate("TabNavigator");
    } catch (error) {
      // Gérer les erreurs
      console.log(error);
    }
  };

  // Data utilisée pour choisir le level du surfeur
  const levelData = [
    { key: "1", value: "Beginner" },
    { key: "2", value: "Intermediate" },
    { key: "3", value: "Confirmed" },
    { key: "4", value: "Expert" },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Tribe</Text>
      <View style={styles.inputAndbutton}>
        {/* <View style={styles.input}> */}
        <View style={styles.input}>
          <SelectList
            setSelected={(val) => setSelectedLevel(val)}
            data={levelData}
            placeholder="Level"
            save="value"
            style={{ ...styles.level, width: "200px" }} // Add width property
          />
        </View>
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          initialValue={{ id: "2" }}
          onSelectItem={setSelectedCountry}
          dataSet={transformedCountries}
          textInputProps={{
            placeholder: "Country",
          }}
          containerStyle={{
            marginTop: 10,
            backgroundColor: "white",
            borderColor: "#E0CDA9",
            borderWidth: 1,
            borderRadius: 7,
            width: "80%",
          }}
        />
        {/* </View> */}
        <TouchableOpacity
          onPress={CreateNewUser}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#0287D9",
    marginBottom: 20,
  },
  input: {
    // display: "flex",
    // alignItems: "center",
    textAlign: "center",

    width: "79%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "15%",
    marginTop: 30,
    backgroundColor: "#0287D9",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 23,
  },
  inputAndbutton: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
});
