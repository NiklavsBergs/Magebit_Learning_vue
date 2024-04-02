<template>
  <div class="center-xs">
    <h3>Weather</h3>
    <div>
      <p>Choose forecast</p>
      <input type="radio" id="current" name="forecast-type" value="CURRENT" v-model="forecastType">
      <label for="current">Current</label><br>
      <input type="radio" id="forecast" name="forecast-type" value="FORECAST" v-model="forecastType">
      <label for="forecast">Next 3 days</label><br>
      <input type="radio" id="day" name="forecast-type" value="DAY" v-model="forecastType">
      <label for="day">Specific date</label>
      <input type="text" v-if="forecastType === 'DAY'" v-model="date" @input="validateDate" placeholder="YYYY-MM-DD">
      <span v-if="!isValidDate && forecastType === 'DAY'" style="color: red;">Input date between 14 days and 300 days from today in the future</span>
    </div>

    <p>{{ weather }}</p>

    <div
      class="col-sm-3 pb15"
      v-for="current in weather"
      :key="current.last_updated"
    >
      <div class="tile center-xs middle-xs">
        <p>{{ current.temp_c }}</p>
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
</style>
