import * as types from './mutation-types'
import config from 'config'

function processForecast (state, payload) {
  payload.forecast.forecastday.forEach(day => {
    var rain = 0;
    var snow = 0;
    var minWind = day.hour[0].wind_kph;

    day.hour.forEach(hour => {
      if (hour.chance_of_rain > rain) {
        rain = hour.chance_of_rain;
      }
      if (hour.chance_of_snow > snow) {
        snow = hour.chance_of_snow;
      }
      if (hour.wind_kph < minWind) {
        minWind = hour.wind_kph;
      }
    });

    day.rain = rain;
    day.snow = snow;
    day.minWind = minWind;
  });

  state.weather = payload.forecast;
}

export const module = {
  namespaced: true,
  state: {
    weather: {}
  },
  mutations: {
    [types.CURRENT] (state, payload) {
      state.weather = payload.current
    },
    [types.FORECAST] (state, payload) {
      processForecast(state, payload);
    },
    [types.DAY] (state, payload) {
      processForecast(state, payload);
    }
  },
  actions: {
    get ({ commit }, payload) {
      let endpoint = '';
      switch (payload.type) {
        case types.CURRENT:
          endpoint = config.weather.endpoints.day;
          break;
        case types.FORECAST:
          endpoint = config.weather.endpoints.forecast;
          break;
        case types.DAY:
          endpoint = `${config.weather.endpoints.day}?date=${payload.date}`;
          break;
      }

      fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          commit(payload.type, res.result)
        })
    }
  },
  getters: {
    weather: state => state.weather,
    temp: state => state.temp
  }
}
