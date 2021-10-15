<template>
  <div>
    <table id="forecast-table">
      <thead>
        <tr>
          <td
            v-for="(col, colIndex) in Object.keys(forecast[0])"
            :key="colIndex"
          >
            {{ getFullNameForRow(col) }}
          </td>
        </tr>
      </thead>
      <tr v-for="(dataRow, index) in forecast" :key="index">
        <td v-for="(dataCol, dataColIndex) in dataRow" :key="dataColIndex">
          {{ dataCol }}
        </td>
      </tr>
    </table>
    <table class="days-buttons">
      <tr>
        <td v-for="(col, index) in allDays" :key="index">
          <button
            class="days-button"
            :value="col"
            v-on:click="changeSelectedDay"
          >
            {{ col }}
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import dateHelper from "@/utils/helpers/dateHelper";
import { CountryData, CountryTableData } from "@/utils/types";
import format from "date-fns/format";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    forecast(): CountryTableData[] {
      if (this.$store.getters.forecast) {
        let allDays: string[] = [];
        let filteredData: CountryTableData[] = this.$store.getters.forecast.map(
          (forecastValue: CountryData) => {
            const newData = new CountryTableData(forecastValue);
            const newDataSplitted = newData.dt.split(" ");
            const dayFromDataCol = parseInt(newDataSplitted[0]);
            const monthFromDataCol = newDataSplitted[1];

            const dayAndMonth = `${dayFromDataCol} ${monthFromDataCol}`;
            const dayFromArray = allDays.filter((day) => day === dayAndMonth);
            if (dayFromArray.length === 0) allDays.push(dayAndMonth);

            if (dayFromDataCol === this.$store.getters.selectedDay)
              return newData;
          }
        );

        this.$data.allDays = allDays;
        filteredData = filteredData.filter((data) => data);
        return filteredData;
      }
      return [];
    },
    ...mapGetters(["selectedDay", "selected"]),
  },
  methods: {
    changeSelectedDay(event) {
      const dayString = event.target.value.toString().split(" ");
      const day = parseInt(dayString);

      this.$store.dispatch("changeSelectedDay", day);

      return;
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
export default class WeatherTable extends Vue {
  data() {
    return {
      allDays: [],
      selectedMonth: `${format(
        dateHelper.convertEpochToDate(this.$store.getters.selected.dt),
        "LLL"
      )}`,
    };
  }
}
</script>
