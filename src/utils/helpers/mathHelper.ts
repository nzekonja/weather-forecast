class MathHelper {
  convertFromKelvinToCelsius(kelvinTemperature: number): number {
    const temperatureInKelvinReduced: number = kelvinTemperature - 273.15;

    return parseFloat(temperatureInKelvinReduced.toFixed(2));
  }
}

export default new MathHelper();
