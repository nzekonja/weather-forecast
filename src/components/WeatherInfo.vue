<template>
  <div v-if="selected" class="short-weather-info">
    <div class="clouds-info">
      <p class="clouds-title">Clouds</p>
      <p class="clouds-description">{{ selected.weather[0].description }}</p>
    </div>
    <div v-if="selected" class="temperature-wind-info">
      <p class="temperature-value">{{ `${temperatureInC}°C` }}</p>
      <p class="wind-info">{{ `Wind ${selected.wind.speed} m/s` }}</p>
    </div>
    <button v-on:click="toogleShowMore">
      {{ showMore ? `Close` : "See Forecast" }}
    </button>
    <SyncLoader v-if="loadingForecast" />
    <WeatherTable v-else-if="showMore" />
  </div>
</template>

<script lang="ts">
import { CountryData, CountryTableData } from "@/utils/types";
import { Component, Vue } from "vue-property-decorator";
import MathHelper from "@/utils/helpers/mathHelper";
import { mapGetters } from "vuex";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import WeatherTable from "./WeatherTable.vue";

@Component({
  components: { SyncLoader, WeatherTable },
  computed: {
    selected(): CountryData {
      return this.$store.getters.selected as any as CountryData;
    },
    temperatureInC(): number {
      return MathHelper.convertFromKelvinToCelsius(
        this.$store.getters.selected.main.temp
      );
    },
    forecast(): CountryTableData[] {
      if (this.$store.getters.forecast) {
        return this.$store.getters.forecast.map(
          (forecastValue: CountryData) => {
            return new CountryTableData(forecastValue);
          }
        );
      }
      return [];
    },
    ...mapGetters(["loadingForecast"]),
  },
  methods: {
    toogleShowMore() {
      this.$data.showMore = !this.$data.showMore;
      this.$store.dispatch("getForecast");
    },
    getFullNameForRow(col: string): string {
      switch (col) {
        case "dt":
          return "Date";
        case "min_temp":
          return "Min Temp";
        case "max_temp":
          return "Max Temp";
        case "windSpeed":
          return "Wind Speed";
        case "description":
          return "Description";
        case "temp":
          return "Temperature";
        default:
          return "";
      }
    },
  },
})
export default class WeatherInfo extends Vue {
  data() {
    return {
      showMore: false,
      keysOfTableData: [],
    };
  }
}
</script>
