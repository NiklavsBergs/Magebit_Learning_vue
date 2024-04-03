<template>
  <div>
    <h3 class="center-xs">Weather</h3>
    <div class="center-xs choose-container">
      <p>Choose forecast</p>
      <input type="radio" id="current" name="forecast-type" value="CURRENT" v-model="forecastType">
      <label for="current">Current</label><br>

      <input type="radio" id="forecast" name="forecast-type" value="FORECAST" v-model="forecastType">
      <label for="forecast">Next 3 days</label><br>

      <input type="radio" id="day" name="forecast-type" value="DAY" v-model="forecastType">
      <label for="day">Specific date</label><br>

      <input type="date" v-if="forecastType === 'DAY'" v-model="date" @input="validateDate"><br>
      <span v-if="!isValidDate && forecastType === 'DAY'" style="color: red;">Input date between 14 days and 300 days from today in the future</span>
    </div>

    <div v-if="forecastType === 'CURRENT'" class="day-card">
      <h4>Currently</h4>
      <ul>
        <li>Temp: {{ weather.temp_c }}C</li>
        <li>Wind speed: {{ weather.wind_kph }}KPH</li>
        <li>Wind direction: {{ weather.wind_dir }}</li>
      </ul>
    </div>

    <div v-if="forecastType !== 'CURRENT'" class="forecast-container">
      <div v-for="day in weather.forecastday" :key="day.date" class="day-card">
        <h4>{{ day.date }}</h4>
        <ul>
          <li>Min Temp: {{ day.day.mintemp_c }}C</li>
          <li>Max Temp: {{ day.day.maxtemp_c }}C</li>
          <li>Min Wind speed: {{ day.minWind }}KPH</li>
          <li>Max Wind speed: {{ day.day.maxwind_kph }}HPH</li>
          <li v-if="day.rain > 0"> Chance of rain: {{ day.rain }}% </li>
          <li v-if="day.snow > 0"> Chance of snow: {{ day.snow }}% </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import Weather from 'src/modules/weather-api/components/Weather'
export default {
  name: 'Weather',
  mixins: [Weather]
}
</script>

<style lang="scss" scoped>
  .forecast-container {
    display: flex;
    flex-wrap: wrap;
  }

  .day-card {
    flex: 1 1 300px;
    margin: 0 10px 10px 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }

  .choose-container {
    padding: 10px;
  }

  label {
    vertical-align: middle;
  }

  input[type = "radio"]{
    height: auto;
    display: inline-block;
    vertical-align: top;
  }
</style>
