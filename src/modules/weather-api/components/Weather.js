import { mapState } from 'vuex';
export default {
  name: 'Weather',
  data () {
    return {
      date: '',
      forecastType: 'CURRENT',
      isValidDate: false
    };
  },
  computed: {
    weather () {
      return this.$store.getters['weather-api/weather'];
    }
  },
  beforeMount () {
    this.$store.dispatch('weather-api/get', { type: this.forecastType });
  },
  watch: {
    forecastType (newVal) {
      if (newVal === 'DAY') {
        if (this.isValidDate) {
          this.$store.dispatch('weather-api/get', { type: newVal, date: this.date });
        }
      } else {
        this.$store.dispatch('weather-api/get', { type: newVal });
      }
    },
    date (newVal) {
      if (this.forecastType === 'DAY') {
        if (this.isValidDate) {
          this.$store.dispatch('weather-api/get', { type: this.forecastType, date: newVal });
        }
      }
    }
  },
  methods: {
    validateDate () {
      const inputDate = new Date(this.date);

      const maxAllowedDate = new Date();
      maxAllowedDate.setDate(maxAllowedDate.getDate() + 300);

      const minAllowedDate = new Date();
      minAllowedDate.setDate(minAllowedDate.getDate() + 14);

      if (
        inputDate > maxAllowedDate ||
        inputDate < minAllowedDate
      ) {
        this.isValidDate = false;
      } else {
        this.isValidDate = true;
        this.$store.dispatch('weather-api/get', { type: this.forecastType, date: this.date });
      }
    }
  }

};
