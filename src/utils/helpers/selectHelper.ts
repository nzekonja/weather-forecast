import { CoutriesForOpenWeatherAPI, CountryForSelect } from "../types";

class SelectHelper {
  parseCountriesToCountriesForSelect = (
    countries: CoutriesForOpenWeatherAPI[]
  ): CountryForSelect[] =>
    countries.map((country) => {
      const countryToReturn: CountryForSelect = {
        label: `${country.name} / ${country.country}`,
        value: country.id,
      };

      return countryToReturn;
    });
}

export default new SelectHelper();
