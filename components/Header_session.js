import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function Header_session(props) {
  console.log("props", props.googlelink);
  // const startDateTime = new Date(props.date_start);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.sessionName}>
          <Text style={styles.sessionName}>{props.name}</Text>
        </View>
        <View style={styles.allText}>
          <View style={styles.spotAndmaps}>
            <Text style={styles.spot}>{props.spot}</Text>
            <Text style={styles.maps}>{props.googlelink}</Text>
          </View>
          <View style={styles.dateAndhour}>
            <Text style={styles.date}>{props.date}</Text>
            <View style={styles.twoHour}>
              <Text style={styles.hour}>
                {props.startHours}h{props.startMinutes}-
              </Text>
              <Text style={styles.hour}>
                {props.endHours}h{props.endMinutes}
              </Text>
            </View>
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
    height: "25%",
  },
  allText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",

    height: "50%",
  },
  sessionName: {
    color: "#646262",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "5%",
  },
  spotAndmaps: {
    marginLeft: "3%",
    display: "flex",
    justifyContent: "space-between",
  },
  spot: {
    color: "#646262",

    fontSize: 10,
  },
  maps: {
    color: "#646262",
    fontSize: 10,
  },
  dateAndhour: {
    marginRight: "3%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  date: {
    color: "#646262",
    fontSize: 10,
  },

  twoHour: {
    color: "#646262",
    display: "flex",
    flexDirection: "row",
  },
  hour: {
    color: "#646262",
    fontSize: 10,
  },
});
