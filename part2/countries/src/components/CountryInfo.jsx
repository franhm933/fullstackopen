const CountryInfo = ({country, countryWeather}) => {
    if(country.length === 0 || countryWeather.length === 0) {
        return null
    }
    //url icono
    console.log(countryWeather)
    const weatherDescription = countryWeather.weather[0].description
    const weatherIcon = 'https://openweathermap.org/img/wn/' + countryWeather.weather[0].icon + '.png'
    return (
        <div className="countryInfo">
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(language => 
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img width="300" src={country.flags.svg} alt={country.flags.alt} />

            <h3>Weather in {country.capital}</h3>
            <p>Temperature {countryWeather.main.temp} Celsius</p>
            <img src={weatherIcon} alt={weatherDescription} />
            <p>Wind {countryWeather.wind.speed} m/s</p>
      </div>
    )
}
export default CountryInfo