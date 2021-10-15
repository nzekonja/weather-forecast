import { appId, baseURL } from "@/utils/constants";
import AxiosHelper from "@/utils/helpers/axiosHelper";
import { CountryData } from "@/utils/types";
import { Axios } from "axios";

const axiosInstance = new Axios({ baseURL });

class WeatherClient {
  async getWeather(cityId: number): Promise<CountryData | undefined> {
    try {
      const res = await axiosInstance.get(
        `/weather/?id=${cityId}&appid=${appId}`
      );
      const data = AxiosHelper.parseAxiosInstanceResponse(res.data);

      const weather: CountryData = data as any as CountryData;
      return weather;
    } catch (err) {
      console.log("Error fetching forecast from API");
    }
    return;
  }

  async getForecast(cityId: number): Promise<CountryData[] | undefined> {
    try {
      const res = await axiosInstance.get(
        `/forecast/?id=${cityId}&appid=${appId}`
      );
      const data = AxiosHelper.parseAxiosInstanceResponse(res.data);
      const forecast: CountryData[] = JSON.parse(
        JSON.stringify(data.list)
      ) as any as CountryData[];

      return forecast;
    } catch (err) {
      console.log("Error fetching forecast from API");
    }
    return;
  }
}

export default new WeatherClient();
