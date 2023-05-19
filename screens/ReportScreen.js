import { ScrollView, View, Text, StyleSheet, SafeAreaView } from "react-native";
import rawData from "../data/report_exemple";
import * as React from "react";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { useState, useEffect } from "react";


export default function ReportScreen({ navigation }) {

    
  



  function calculateAverages(data) {
    const hours = data.hours;
    const intervalSize = 3; // 4-hour interval

    const averagedData = {
      swellDirection: [],
      swellPeriod: [],
      waterTemperature: [],
      waveDirection: [],
      waveHeight: [],
      wavePeriod: [],
      windSpeed: [],
    };

    for (let i = 0; i < hours.length; i += intervalSize) {
      const intervalData = hours.slice(i, i + intervalSize);

      const averagedHour = {
        swellDirection: 0,
        swellPeriod: 0,
        waterTemperature: 0,
        waveDirection: 0,
        waveHeight: 0,
        wavePeriod: 0,
        windSpeed: 0,
      };

      for (const hour of intervalData) {
        averagedHour.swellDirection += hour.swellDirection.sg;
        averagedHour.swellPeriod += hour.swellPeriod.sg;
        averagedHour.waterTemperature += hour.waterTemperature.sg;
        averagedHour.waveDirection += hour.waveDirection.sg;
        averagedHour.waveHeight += hour.waveHeight.sg;
        averagedHour.wavePeriod += hour.wavePeriod.sg;
        averagedHour.windSpeed += hour.windSpeed.sg;
      }

      const averageHourData = {
        swellDirection: averagedHour.swellDirection / intervalData.length,
        swellPeriod: averagedHour.swellPeriod / intervalData.length,
        waterTemperature: averagedHour.waterTemperature / intervalData.length,
        waveDirection: averagedHour.waveDirection / intervalData.length,
        waveHeight: averagedHour.waveHeight / intervalData.length,
        wavePeriod: averagedHour.wavePeriod / intervalData.length,
        windSpeed: averagedHour.windSpeed / intervalData.length,
      };

      for (const key in averageHourData) {
        averagedData[key].push(averageHourData[key]);
      }
    }

    return averagedData;
  }

  const averagedData = calculateAverages(rawData);

  const tableHead = ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'];
  const widthArr = [40, 60, 80, 100, 120, 140, 160, 180, 200];

  const generateData = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const dataRow = [];
      for (let j = 0; j < 9; j++) {
        dataRow.push(`${i}${j}`);
      }
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
        style={[styles.row, index % 2 && { backgroundColor: '#ffffff' }]}
        textStyle={styles.text}
      />
    ));
  };

  return (
    <SafeAreaView>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
            <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {renderRows()}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  head: {
    height: 50,
    backgroundColor: '#6F7BD9',
  },
  text: {
    textAlign: 'center',
    fontWeight: '200',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
});
