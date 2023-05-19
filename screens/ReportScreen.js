import { ScrollView, View, Text, StyleSheet, SafeAreaView,ImageBackground,
} from "react-native";
import rawData from "../data/report_exemple";
import * as React from "react";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { useState, useEffect } from "react";
import Header_spot from "../components/Header_spot";

export default function ReportScreen({ navigation }) {
  let day = "";

  function date() {
    switch (new Date().getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }
    return day;
  }
  date();

  const nextDay = (i) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayIndex = new Date().getDay();
    const nextDayIndex = (todayIndex + i) % 7; // Get the index of the next day, wrapping around to Sunday if necessary
    return days[nextDayIndex];
  };

  function calculateAverages(data) {
    const hours = data.hours;
    const intervalSize = 3;

    // Find the index of the first "T05" time
    let startIndex = 0;
    for (let i = 0; i < hours.length; i++) {
      if (hours[i].time.endsWith("T05:00:00+00:00")) {
        startIndex = i;
        break;
      }
    }

    const averagedData = {
      time: [],
      swellDirection: [],
      swellPeriod: [],
      swellHeight: [],
      waterTemperature: [],
      waveDirection: [],
      waveHeight: [],
      wavePeriod: [],
      windSpeed: [],
      windDirection: [],
      windWaveHeight: [],
      energy: [], // Added energy property
    };

    for (let i = startIndex; i < hours.length; i += intervalSize) {
      const intervalData = hours.slice(i, i + intervalSize);

      const averagedHour = {
        time: intervalData[0].time, // Get the time of the first hour in the interval
        swellDirection: 0,
        swellPeriod: 0,
        waterTemperature: 0,
        waveDirection: 0,
        waveHeight: 0,
        swellHeight: 0,
        wavePeriod: 0,
        windSpeed: 0,
        windDirection: 0,
        windWaveHeight: 0,
        energy: 0, // Added energy property
      };

      for (const hour of intervalData) {
        averagedHour.swellDirection += hour.swellDirection.sg;
        averagedHour.swellPeriod += hour.swellPeriod.sg;
        averagedHour.waterTemperature += hour.waterTemperature.sg;
        averagedHour.waveDirection += hour.waveDirection.sg;
        averagedHour.waveHeight += hour.waveHeight.sg;
        averagedHour.swellHeight += hour.swellHeight.sg;
        averagedHour.wavePeriod += hour.wavePeriod.sg;
        averagedHour.windSpeed += hour.windSpeed.sg;
        averagedHour.windDirection += hour.windDirection.sg;
        averagedHour.windWaveHeight += hour.windWaveHeight.noaa;

        // Calculate energy for the current hour
        const energy =
          (0.5 *
            1025 *
            9.81 *
            Math.pow(hour.waveHeight.sg, 2) *
            hour.wavePeriod.sg) /
          1000;
        averagedHour.energy += energy;
      }

      const averageHourData = {
        time: averagedHour.time,
        swellDirection: (
          averagedHour.swellDirection / intervalData.length
        ).toFixed(2),
        swellPeriod: (averagedHour.swellPeriod / intervalData.length).toFixed(
          2
        ),
        waterTemperature: (
          averagedHour.waterTemperature / intervalData.length
        ).toFixed(0),
        waveDirection: (
          averagedHour.waveDirection / intervalData.length
        ).toFixed(0),
        waveHeight: (averagedHour.waveHeight / intervalData.length).toFixed(1),
        swellHeight: (averagedHour.swellHeight / intervalData.length).toFixed(
          1
        ),
        wavePeriod: (averagedHour.wavePeriod / intervalData.length).toFixed(0),
        windSpeed: (averagedHour.windSpeed / intervalData.length).toFixed(0),
        windWaveHeight: (
          averagedHour.windWaveHeight / intervalData.length
        ).toFixed(1),
        windDirection: getWindDirection(
          averagedHour.windDirection / intervalData.length
        ),
        energy: averagedHour.energy.toFixed(0),
      };

      for (const key in averageHourData) {
        averagedData[key].push(averageHourData[key]);
      }
    }

    return averagedData;
  }

  function getWindDirection(degrees) {
    if (degrees >= 337.5 || degrees < 22.5) {
      return "North";
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return "Northeast";
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return "East";
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return "Southeast";
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return "South";
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return "Southwest";
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return "West";
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return "Northwest";
    }
  }

  const averagedData = calculateAverages(rawData);

  console.log(averagedData);

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
    color: 'white'
  };


  return (
    <View style={styles.background}>
      <Header_spot />
      <ScrollView horizontal={true} style={styles.scrollView}
>
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
        flex: 1
    },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    marginTop: 60
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
