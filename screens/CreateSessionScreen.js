import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { addSessionName, addSpot } from "../reducers/session";
import { useDispatch, useSelector } from "react-redux";
import MY_FETCH_API from"../myfetchapi"




export default function CreateSessionScreen({ navigation }) {
  const [sessionName, setSessionName] = useState("");
  const [spot, setSpot] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [spots, setSpots] = useState([]);
  const [spotInfo, setSpotInfo] = useState([]);


  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.value);
  console.log("session", session); // Ajout d'un console.log



  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(MY_FETCH_API + "/spots");
        const json = await response.json();
        const data = json.data;
        setSpots(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpot();
  }, []);

  const spotNames = spots.map((item) => item.name);

  const transformedSpot = spotNames.map((name, index) => {
    return {
      id: index + 1,
      title: name,
    };
  });

  function handlePress() {
    if (sessionName !== "" && spot !== "") {
      fetch(MY_FETCH_API + `/spots/bySpotName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spotName: selectedSpot.title })
      })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
          console.log('data', data);
          setSpotInfo(data);
          dispatch(addSessionName(sessionName));
          dispatch(addSpot(data.data._id)); // Access the _id property from the data directly
          navigation.navigate("CreateSessionDateScreen");
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert("Please complete your session Bodhi 🤙");
    }
  }
  
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MySessionsScreen")}
        >
          <Image style={styles.back} source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Your sessions</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.content}>
          <View style={styles.namesession}>
            <Text style={styles.sessionde}>Name Session :</Text>
            <TextInput
              placeholder="..."
              id="Name session"
              style={styles.spot}
              value={sessionName}
              onChangeText={setSessionName}
            />
          </View>
          <View style={styles.namesession}>
            <Text style={styles.sessionde}>Spot :</Text>
            
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            initialValue={{ id: "2" }}
            onSelectItem={(item) => {
              setSelectedSpot(item);
              }}
            dataSet={transformedSpot}
            textInputProps={{
              placeholder: 'Spot',
            }}
              containerStyle={{
              marginTop: 10,
              backgroundColor: "white",
              borderColor: "#E0CDA9",
              borderWidth: 1,
              borderRadius: 7,
            }}
          />
          <Button
            title="Next"
            onPress={handlePress}
              style={styles.next}
          />
          
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0CDA9",
  },
  header: {
    height: "18%",
    width: "100%",
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  back: {
    width: 25,
    height: 25,
    tintColor: "#0487D9",
    marginLeft: 20,
    marginRight: 30,
  },

  title: {
    fontSize: 25,
    fontWeight: 500,
    color: "#0487D9",
  },
  body: {
    display: "flex",
    alignItems: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    height: "85%",
    width: "90%",
    marginTop: 10,
    borderRadius: 10,
  },
  namesession: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  sessionde: {
    margin: 15,
    fontSize: 15,
    fontWeight: 500,
  },

  spot: {
    borderBottomColor: "#16A1F7",
    borderBottomWidth: 1,
    borderRadius: 5,
    width: "50%",
    height: 30,
    marginLeft: 5,
    textAlign: "center",
  },
});
