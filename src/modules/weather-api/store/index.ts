import * as types from './mutation-types'
import config from 'config'

export const module = {
  namespaced: true,
  state: {
    weather: []
  },
  mutations: {
    [types.CURRENT] (state, payload) {
      state.weather = payload
    },
    [types.FORECAST] (state, payload) {
      state.weather = payload
    },
    [types.DAY] (state, payload) {
      state.weather = payload
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
          commit(types.CURRENT, res.result)
        })
    }
  },
  getters: {
    weather: state => state.weather
  }
}
