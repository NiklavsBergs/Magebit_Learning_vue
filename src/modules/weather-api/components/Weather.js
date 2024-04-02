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
    this.$store.dispatch('weather-api/get', { type: 'CURRENT' });
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
        this.$store.dispatch('weather-api/get', { type: this.forecastType, date: newVal });
      }
    }
  },
  methods: {
    validateDate () {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      const currentDate = new Date();
      const inputDate = new Date(this.date);

      const maxAllowedDate = new Date(currentDate);
      maxAllowedDate.setDate(currentDate.getDate() + 300);

      const minAllowedDate = new Date(currentDate);
      minAllowedDate.setDate(currentDate.getDate() + 14);

      if (
        !dateRegex.test(this.date) ||
        isNaN(inputDate.getTime()) ||
        inputDate <= currentDate ||
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
