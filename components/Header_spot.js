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
  SafeAreaView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Header_spot(props) {
  const navigation = useNavigation();

  const renderStars = () => {
    const rating = props.rating;
    const starIcons = [];

    for (let i = 0; i < rating; i++) {
      starIcons.push(
        <MaterialCommunityIcons name="star" style={styles.starIcon} key={i} />
      );
    }

    return starIcons;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <View style={styles.header}>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image style={styles.back} source={require("../assets/back.png")} />
        </TouchableOpacity> */}
        <View style={styles.spotName}>
          <Text style={styles.spotNameText}>{props.name}</Text>
        </View>
        </View>
        <View style={styles.allText}>
          <View style={styles.typeAndmaps}>
            <Text style={styles.type}>Type: {props.type}</Text>
            <Text
              style={styles.maps}
              onPress={() => {
                Linking.openURL(
                  `https://maps.google.com/maps?q=${props.latitude},${props.longitude}`
                );
              }}
            >
              Google maps
            </Text>
          </View>
          <View style={styles.ratingAndrealiability}>
            <Text style={styles.rating}>
              Rating: <Text style={styles.stars}>{renderStars()}</Text>
            </Text>
            <Text style={styles.realiability}>
              Reliability: {props.reliability}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",

    width: "100%",
    height: "20%",
  },
  header: {
    height: "18%",
    width: "100%",
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    },
  allText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "5%",
    height: "50%",
  },
  spotName: {
    color: "#646262",
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18",
    // color: "#646262",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingBottom: "5%",
  },
  spotNameText: {
    fontSize: 12,
  },
  typeAndmaps: {
    marginLeft: "3%",
  },
  type: {
    color: "#646262",
    paddingBottom: "20%",
    fontSize: 10,
  },
  maps: {
    color: "#646262",
    fontSize: 10,
  },
  ratingAndrealiability: {
    marginRight: "3%",
  },
  rating: {
    color: "#646262",
    paddingBottom: "10%",
    fontSize: 10,
  },

  realiability: {
    color: "#646262",
    fontSize: 10,
  },
  stars: {
    color: "#F2CB05",
  },
  back: {
    width: 20,
    height: 20,
    tintColor: "#646262",
    marginTop: 20,
    },
});
