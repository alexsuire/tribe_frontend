import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Forecast_one_spot() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.day}>Monday</Text>
        <Text style={styles.hour}>Morning</Text>
        <Text style={styles.hour}>Afternoon</Text>
        <Text style={styles.hour}>Evening</Text>
      </View>
      <View style={styles.forecastContainer}>
        <View style={styles.icons}>
          <MaterialCommunityIcons
            style={styles.star}
            name={"star-outline"}
            size={30}
            color={"#0487D9"}
          />
          <MaterialCommunityIcons
            style={styles.wave}
            name={"sine-wave"}
            size={30}
            color={"#0487D9"}
          />
          <MaterialCommunityIcons
            style={styles.wind}
            name={"weather-windy"}
            size={30}
            color={"#0487D9"}
          />
          <MaterialCommunityIcons
            style={styles.cloud}
            name={"weather-partly-cloudy"}
            size={30}
            color={"#0487D9"}
          />
        </View>
        <View style={styles.contentRight}>
          <View style={styles.firstColumn}>
            <MaterialCommunityIcons
              style={styles.star2}
              name={"star"}
              size={30}
            >
              <Text style={styles.numberStars}>2</Text>
            </MaterialCommunityIcons>
            <Text style={styles.wave2}>1m</Text>
            <Text style={styles.wind2}>10km/h</Text>
            <MaterialCommunityIcons
              style={styles.cloud2}
              name={"weather-partly-cloudy"}
              size={30}
              color={"#0487D9"}
            />
          </View>
          <View style={styles.secondColumn}>
            <MaterialCommunityIcons
              style={styles.star2}
              name={"star"}
              size={30}
            >
              <Text style={styles.numberStars}>0</Text>
            </MaterialCommunityIcons>
            <Text style={styles.wave2}>0.5m</Text>
            <Text style={styles.wind2}>30km/h</Text>
            <MaterialCommunityIcons
              style={styles.cloud2}
              name={"weather-partly-cloudy"}
              size={30}
              color={"#0487D9"}
            />
          </View>
          <View style={styles.thirdColumn}>
            <MaterialCommunityIcons
              style={styles.star2}
              name={"star"}
              size={30}
            >
              <Text style={styles.numberStars}>4</Text>
            </MaterialCommunityIcons>
            <Text style={styles.wave2}>2m</Text>
            <Text style={styles.wind2}>5km/h</Text>
            <MaterialCommunityIcons
              style={styles.cloud2}
              name={"weather-partly-cloudy"}
              size={30}
              color={"#0487D9"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#16A1F7",
    height: 60,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "3%",
    justifyContent: "space-around",
  },

  day: {
    color: "white",
    fontSize: 10,
    marginTop: 12,
  },
  forecastContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  body: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 15,
    marginHorizontal: 20, // Ajouter des marges horizontales
  },
  date: {
    fontSize: 11,
    marginTop: 12,
    color: "#646262",
  },
  hour: {
    fontSize: 10,
    marginTop: 12,
    color: "white",
  },

  firstSession: {
    borderTopWidth: 0, // Remove the top border for the first session
  },
  icons: {
    display: "flex",
    flexDirection: "column",
    borderRightWidth: 1,
    borderColor: "#F0F0F0",
    paddingRight: 20,
    paddingTop: 20,
    paddingLeft: 30,
    paddingBottom: 20,
  },
  star: { borderBottomWidth: 1 },
  wave: { marginTop: 12, borderBottomWidth: 1, borderColor: "black" },
  wind: { marginTop: 12 },
  cloud: { marginTop: 12 },
  star2: { color: "#F2CB05", marginLeft: 20, borderTopWidth: 1 },
  wave2: { marginTop: 20, fontSize: 10, color: "#646262", marginLeft: 32 },
  wind2: { marginTop: 25, fontSize: 10, color: "#646262", marginLeft: 28 },
  cloud2: { marginTop: 20, marginLeft: 28 },
  contentRight: {
    display: "flex",
    flexDirection: "row",
  },
  firstColumn: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    // paddingLeft: 32,
    paddingBottom: 20,
  },
  secondColumn: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 15,
    paddingBottom: 20,
  },
  thirdColumn: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 15,
    paddingBottom: 20,
  },

  numberStars: {},
});
