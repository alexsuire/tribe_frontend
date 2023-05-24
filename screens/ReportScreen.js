import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground, TouchableOpacity, Image
} from "react-native";
import rawData from "../data/report_exemple";
import * as React from "react";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { useState, useEffect } from "react";
import Header_spot from "../components/Header_spot";
import MY_FETCH_API from "../myfetchapi";
import { calculateAverages } from "../modules/calculateAverages";
import { date, nextDay } from "../modules/date";
import { useSelector } from "react-redux";

export default function ReportScreen({ navigation }) {
  const user = useSelector((state) => state.users.value);
  const [spot, setSpot] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [dataFetched, setDataFetched] = useState(null);


  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const spotsResponse = await fetch(
  //         MY_FETCH_API + `/spots/oneSpot/${user.active_spot}`
  //       );
  //       const spotsJson = await spotsResponse.json();
  //       const spotsData = spotsJson.data;
  //       setSpot(spotsData);

  //       if (spot) {
  //         setLongitude(spot.longitude);
  //         setLatitude(spot.latitude);

  //         const response = await fetch(
  //           `https://api.stormglass.io/v2/weather/point?lat=${latitude}&lng=${longitude}&params=waterTemperature,wavePeriod,waveDirection,waveHeight,windWaveDirection,windWaveHeight,windWavePeriod,swellPeriod,secondarySwellPeriod,swellDirection,secondarySwellDirection,swellHeight,secondarySwellHeight,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m,windSpeed1000hpa,windSpeed800hpa,windSpeed500hpa,windSpeed200hpa,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windDirection1000hpa,windDirection800hpa,windDirection500hpa,windDirection200hpa,airTemperature,airTemperature80m,airTemperature100m,airTemperature1000hpa,airTemperature800hpa,airTemperature500hpa,airTemperature200hpa,precipitation,gust,cloudCover,humidity,pressure,visibility,currentSpeed,currentDirection,iceCover,snowDepth`,
  //           {
  //             headers: {
  //               Authorization:
  //                 "d6bda9d4-ea77-11ed-a654-0242ac130002-d6bdaa42-ea77-11ed-a654-0242ac130002",
  //             },
  //           }
  //         );
  //         const weatherJson = await response.json();
  //         const weatherData = weatherJson.data;
  //         setDataFetched(weatherData);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  

  // ---- Gère l'affichage des dates -----

  const day = date();
  nextDay();

  // --- appel la fonction qui gère le calcul des datas pour le tableaux de report

  const averagedData = calculateAverages(rawData);

  const tableHead = [
    `${day}`,
    "5AM",
    "8AM",
    "11AM",
    "2PM",
    "5PM",
    "8PM",
    `${nextDay(1)}`,
    "5AM",
    "8AM",
    "11AM",
    "2PM",
    "5PM",
    "8PM",
    `${nextDay(2)}`,
    "5AM",
    "8AM",
    "11AM",
    "2PM",
    "5PM",
    "8PM",
  ];
  const widthArr = [
    140, 80, 80, 80, 80, 80, 80, 140, 80, 80, 80, 80, 80, 80, 140, 80, 80, 80,
    80, 80, 80, 140,
  ];

  const generateData = () => {
    const data = [];

    // Exemple de données personnalisées
    const customData = [
      [
        "Wave Height",
        `${averagedData.windWaveHeight[0]}`,
        `${averagedData.windWaveHeight[1]}`,
        `${averagedData.windWaveHeight[2]}`,
        `${averagedData.windWaveHeight[3]}`,
        `${averagedData.windWaveHeight[4]}`,
        `${averagedData.windWaveHeight[5]}`,
        "Wave Height",
        `${averagedData.windWaveHeight[8]}`,
        `${averagedData.windWaveHeight[9]}`,
        `${averagedData.windWaveHeight[10]}`,
        `${averagedData.windWaveHeight[11]}`,
        `${averagedData.windWaveHeight[12]}`,
        `${averagedData.windWaveHeight[13]}`,
        "Wave Height",
        `${averagedData.windWaveHeight[16]}`,
        `${averagedData.windWaveHeight[17]}`,
        `${averagedData.windWaveHeight[18]}`,
        `${averagedData.windWaveHeight[19]}`,
        `${averagedData.windWaveHeight[20]}`,
        `${averagedData.windWaveHeight[21]}`,
      ],
      [
        "Period",
        `${averagedData.wavePeriod[0]}`,
        `${averagedData.wavePeriod[1]}`,
        `${averagedData.wavePeriod[2]}`,
        `${averagedData.wavePeriod[3]}`,
        `${averagedData.wavePeriod[4]}`,
        `${averagedData.wavePeriod[5]}`,
        "Period",
        `${averagedData.wavePeriod[8]}`,
        `${averagedData.wavePeriod[9]}`,
        `${averagedData.wavePeriod[10]}`,
        `${averagedData.wavePeriod[11]}`,
        `${averagedData.wavePeriod[12]}`,
        `${averagedData.wavePeriod[13]}`,
        "Period",
        `${averagedData.wavePeriod[16]}`,
        `${averagedData.wavePeriod[17]}`,
        `${averagedData.wavePeriod[18]}`,
        `${averagedData.wavePeriod[19]}`,
        `${averagedData.wavePeriod[21]}`,
        `${averagedData.wavePeriod[22]}`,
      ],
      [
        "Wind Direction",
        `${averagedData.windDirection[0]}`,
        `${averagedData.windDirection[1]}`,
        `${averagedData.windDirection[2]}`,
        `${averagedData.windDirection[3]}`,
        `${averagedData.windDirection[4]}`,
        `${averagedData.windDirection[5]}`,
        "Wind Direction",
        `${averagedData.windDirection[8]}`,
        `${averagedData.windDirection[9]}`,
        `${averagedData.windDirection[10]}`,
        `${averagedData.windDirection[11]}`,
        `${averagedData.windDirection[12]}`,
        `${averagedData.windDirection[13]}`,
        "Wind Direction",
        `${averagedData.windDirection[16]}`,
        `${averagedData.windDirection[17]}`,
        `${averagedData.windDirection[18]}`,
        `${averagedData.windDirection[19]}`,
        `${averagedData.windDirection[20]}`,
        `${averagedData.windDirection[21]}`,
      ],
      [
        "Wind Speed",
        `${averagedData.windSpeed[0]}`,
        `${averagedData.windSpeed[1]}`,
        `${averagedData.windSpeed[2]}`,
        `${averagedData.windSpeed[3]}`,
        `${averagedData.windSpeed[4]}`,
        `${averagedData.windSpeed[5]}`,
        "Wind Speed",
        `${averagedData.windSpeed[8]}`,
        `${averagedData.windSpeed[9]}`,
        `${averagedData.windSpeed[10]}`,
        `${averagedData.windSpeed[11]}`,
        `${averagedData.windSpeed[12]}`,
        `${averagedData.windSpeed[13]}`,
        "Wind Speed",
        `${averagedData.windSpeed[16]}`,
        `${averagedData.windSpeed[17]}`,
        `${averagedData.windSpeed[18]}`,
        `${averagedData.windSpeed[19]}`,
        `${averagedData.windSpeed[20]}`,
        `${averagedData.windSpeed[21]}`,
      ],
      [
        "Water Temperature",
        `${averagedData.waterTemperature[0]}`,
        `${averagedData.waterTemperature[1]}`,
        `${averagedData.waterTemperature[2]}`,
        `${averagedData.waterTemperature[3]}`,
        `${averagedData.waterTemperature[4]}`,
        `${averagedData.waterTemperature[5]}`,
        "Water Temperature",
        `${averagedData.waterTemperature[8]}`,
        `${averagedData.waterTemperature[9]}`,
        `${averagedData.waterTemperature[10]}`,
        `${averagedData.waterTemperature[11]}`,
        `${averagedData.waterTemperature[12]}`,
        `${averagedData.waterTemperature[13]}`,
        "Water Temperature",
        `${averagedData.waterTemperature[13]}`,
        `${averagedData.waterTemperature[14]}`,
        `${averagedData.waterTemperature[15]}`,
        `${averagedData.waterTemperature[16]}`,
        `${averagedData.waterTemperature[17]}`,
        `${averagedData.waterTemperature[18]}`,
      ],
      [
        "Energy",
        `${averagedData.energy[0]}`,
        `${averagedData.energy[1]}`,
        `${averagedData.energy[2]}`,
        `${averagedData.energy[3]}`,
        `${averagedData.energy[4]}`,
        `${averagedData.energy[5]}`,
        "Energy",
        `${averagedData.energy[8]}`,
        `${averagedData.energy[9]}`,
        `${averagedData.energy[10]}`,
        `${averagedData.energy[11]}`,
        `${averagedData.energy[12]}`,
        `${averagedData.energy[13]}`,
        "Energy",
        `${averagedData.energy[16]}`,
        `${averagedData.energy[17]}`,
        `${averagedData.energy[18]}`,
        `${averagedData.energy[19]}`,
        `${averagedData.energy[20]}`,
        `${averagedData.energy[21]}`,
      ],
    ];

    for (let i = 0; i < customData.length; i++) {
      const dataRow = customData[i].map((value) => String(value));
      data.push(dataRow);
    }

    return data;
  };

  const renderRows = () => {
    const data = generateData();
    return data.map((dataRow, index) => (
      <Row
        key={index}
        data={dataRow}
        widthArr={widthArr}
        style={[styles.row, index % 2 && { backgroundColor: "#ffffff" }]}
        textStyle={styles.text}
      />
    ));
  };

  const tableHeaderStyle = {
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "400",
    color: "white",
  };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
        >
          <Image style={styles.back} source={require("../assets/back.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <View>
          <Table borderStyle={{ borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.head}
              textStyle={tableHeaderStyle}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: "#C1C0B9" }}>
              {renderRows()}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#16A1F7",
    flex: 1,
   
  },
 
  header:{
    height: '12%',
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: '#16A1F7',

  },
  back:{
    width: 30,
    height: 30,
    tintColor: "white",
    marginLeft: '5%',
    marginBottom: '5%',

  },
  scrollView: {
    // marginTop: 60,
  },
  head: {
    height: 50,
    backgroundColor: "#0487D9",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontWeight: "200",
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 70,
    backgroundColor: "#F7F8FA",
  },
});
