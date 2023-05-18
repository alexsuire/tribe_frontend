import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginCountry, addToken } from "../reducers/users";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import MY_FETCH_API from "../myfetchapi";
import { SelectList } from 'react-native-dropdown-select-list'



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
        const response = await fetch(MY_FETCH_API + "/nationalities/allCountries");
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
      const response = await fetch(MY_FETCH_API + `/nationalities/oneCountry/${selectedCountry.title}`
      );
      const data = await response.json();
      dispatch(loginCountry(data.data._id));

      // Exécuter le deuxième fetch seulement si le premier fetch a renvoyé des données
      const secondResponse = await fetch( MY_FETCH_API + "/users/signup", {
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
      dispatch(addToken(responseData.data.token));
    } catch (error) {
      // Gérer les erreurs
      console.log(error);
    }
    navigation.navigate("TabNavigator");
  };

  // Data utilisée pour choisir le level du surfeur
  const levelData = [
    { key: "1", value: "Débutant" },
    { key: "2", value: "Intermediaire" },
    { key: "3", value: "Confirmé" },
    { key: "4", value: "Expert" },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Tribe</Text>
      <SelectList
        setSelected={(val) => setSelectedLevel(val)}
        data={levelData}
        placeholder="Level"
        save="value"
        style={styles.level}
      />
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={{ id: "2" }}
        onSelectItem={setSelectedCountry}
        dataSet={transformedCountries}
        containerStyle={{
          width: "80%",
          backgroundColor: "white",
          borderColor: "#E0CDA9",
          borderWidth: 1,
          borderRadius: 7,
        }}
      />

      <TouchableOpacity
        onPress={CreateNewUser}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Suivant</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#0287D9",
    marginBottom: 20,
  },
  input: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    height: "7%",
    marginTop: 15,
    borderRadius: 7,
    borderColor: "#E0CDA9",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "8%",
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
});
