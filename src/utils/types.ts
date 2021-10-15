import { baseURL } from "@/utils/constants";
import { format } from "date-fns";
import DateHelper from "./helpers/dateHelper";

interface CountryForSelect {
  label: string;
  value: number;
}
interface CoutriesForOpenWeatherAPI {
  id: number;
  name: string;
  country: string;
}

interface CountryData {
  dt: number;
  coord: Coord;
  weather: Weather[];
  main: MainObject;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Weather extends WeatherObject {
  base: string;
}

interface WeatherObject {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainObject {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
  dt: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface ICountryTableData {
  temp: number;
  min_temp: number;
  max_temp: number;
  windSpeed: number;
  description: string;
  dt: string;
}

class CountryTableData implements ICountryTableData {
  constructor(countryData: CountryData) {
    this.dt = format(
      DateHelper.convertEpochToDate(countryData.dt),
      "d MMM yyyy haa"
    );
    this.temp = countryData.main.temp;
    this.min_temp = countryData.main.temp_min;
    this.max_temp = countryData.main.temp_max;
    this.windSpeed = countryData.wind.speed;
    this.description = countryData.weather[0].description;
  }
  temp: number;
  min_temp: number;
  max_temp: number;
  windSpeed: number;
  description: string;
  dt: string;
}

export {
  CountryForSelect,
  CoutriesForOpenWeatherAPI,
  CountryData,
  CountryTableData,
};
