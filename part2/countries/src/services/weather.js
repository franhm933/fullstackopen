import axios from 'axios'
const baseUrlWeatherAll = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = ({q, appid}) => {
  const baseUrlWeatherAllWitParameters = `${baseUrlWeatherAll}?q=${q}&units=metric&lang=en&appid=${appid}`;
  const request = axios.get(baseUrlWeatherAllWitParameters)
  return request.then(response => response.data)
}

export default { getWeather }