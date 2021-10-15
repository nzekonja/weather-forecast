import WeatherClient from "@/clients/weatherClient";
import { CountryData } from "@/utils/types";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    country: {
      state: {
        selected: "",
        loading: false,
        loadingForecast: false,
        forecast: "",
        selectedDay: new Date(Date.now()).getDate(),
      },
      getters: {
        selected: (state) => state.selected,
        loading: (state) => state.loading,
        loadingForecast: (state) => state.loadingForecast,
        forecast: (state) => state.forecast,
        selectedDay: (state) => state.selectedDay,
      },
      mutations: {
        changeSelected(state, value) {
          state.selected = value;
        },
        toogleLoading(state) {
          state.loading = !state.loading;
        },
        toogleLoadingForecast(state) {
          state.forecastLoading = !state.forecastLoading;
        },
        setForecast(state, value) {
          state.forecast = value;
        },
        changeSelectedDay(state, value) {
          state.selectedDay = value;
        },
      },
      actions: {
        changeSelectedDay(context, payload) {
          context.commit("changeSelectedDay", payload);
        },

        async changeSelected(context, payload) {
          context.commit("toogleLoading");
          try {
            const data = await WeatherClient.getWeather(payload);
            context.commit("changeSelected", data);
          } catch (err) {
            console.log(`Error fetching weather from API:${err}`);
          }
          context.commit("toogleLoading");
        },

        async getForecast(context) {
          context.commit("toogleLoadingForecast");

          try {
            /* const res = await axios.get(
              `${baseURL}/forecast/?id=${context.getters.selected.id}&appid=${appId}`
            ); */
            const data = await WeatherClient.getForecast(
              context.getters.selected.id
            );
            if (data) {
              const forecast: CountryData[] = data as CountryData[];

              context.commit("setForecast", forecast);
            }
          } catch (err) {
            console.log("Error fetching forecast from API");
          }
          context.commit("toogleLoadingForecast");
        },
      },
    },
  },
});
