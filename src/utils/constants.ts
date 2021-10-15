import { CountryForSelect, CoutriesForOpenWeatherAPI } from "./types";
import SelectHelper from "./helpers/selectHelper";

const headline = "Weather forecast";
const homePageDropdownInfo = "Please select city to see the forecast";
const footerTitle = "Weather App";
const footerAuthor = "Ellas Pelkonen";
const seeForecastButtonText = "See forecast";
const citySelectPlaceHolder = "City";

const countriesFromOpenWeatherAPI: CoutriesForOpenWeatherAPI[] = [
  {
    id: 6167865,
    name: "Toronto",
    country: "CA",
  },
  {
    id: 6094817,
    name: "Ottawa",
    country: "CA",
  },
  {
    id: 1850147,
    name: "Tokyo",
    country: "JP",
  },
];
const baseURL = "http://api.openweathermap.org/data/2.5";
const appId = "538882fc8387290c6cee83f313a6acf5";

export {
  headline,
  homePageDropdownInfo,
  footerTitle,
  footerAuthor,
  countriesFromOpenWeatherAPI,
  seeForecastButtonText,
  citySelectPlaceHolder,
  baseURL,
  appId,
};
