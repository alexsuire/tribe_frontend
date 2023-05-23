function calculatePreview(data) {
    
    const hours = data.hours;
    const intervalSize = 6;

    let startIndex = 0;
 

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
  }

  module.exports = { calculatePreview }
