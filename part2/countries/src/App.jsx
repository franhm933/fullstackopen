import { useState, useEffect } from "react";
import Search from "./components/Search";
import ListCountries from "./components/ListCountries";
import CountryInfo from "./components/CountryInfo";
import countriesService from "./services/countries";
import weatherService from "./services/weather"

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryToShow, setcountryToShow] = useState([]);
  const [search, setSearch] = useState(null)
  const [searchLength, setSearchLength] = useState(0)
  const [countryWeather, setcountryWeather] = useState([])
  const api_key = import.meta.env.VITE_SOME_KEY

  // Obtener datos de servicio
  useEffect(() => {
    countriesService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
      setFilteredCountries(initialCountries)
      console.log(countries)
    })
  }, [])

  // Handle
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue)
    console.log(searchValue)

    // Logica para filtrar
    if(searchValue == '') {
      setFilteredCountries(countries)
    } else {
      setFilteredCountries(countries.filter(country =>
        country.name.common.toLowerCase().includes(searchValue))
      )
    }
    const countryResult = countries.filter(country => country.name.common.toLowerCase().includes(searchValue))[0]
    const realLength = countries.filter(country => country.name.common.toLowerCase().includes(searchValue)).length

    setSearchLength(realLength)
    setcountryToShow([])
    if(realLength == 1) {
      console.log('solo 1', api_key)
      console.log(countryResult.latlng[0])
      setcountryToShow(countryResult)
      handleWeater(countryResult)
    }

  }
  const handleShowCountry = (country) => {
    setcountryToShow(country)
    handleWeater(country)
  }

  const handleWeater = (country) => {
    weatherService
      .getWeather({
        q: country.capital, 
        appid: api_key
      })
      .then(countryWeather => {
        setcountryWeather(countryWeather)
      })
  }

  

  return (
    <>
      <h1>Countries App</h1>
      <Search value={countries} handle={handleSearchChange} searchLength={searchLength} />
      <ListCountries countries={filteredCountries} search={search} searchLength={searchLength} handleShow={handleShowCountry}/>
      <CountryInfo country={countryToShow} countryWeather={countryWeather} />
    </>
  )
}

export default App
