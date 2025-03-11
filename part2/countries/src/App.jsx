import { useState, useEffect } from "react";
import Search from "./components/Search";
import ListCountries from "./components/ListCountries";
import countriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState(null)
  const [searchLength, setSearchLength] = useState(0)

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
    const realLength = countries.filter(country => country.name.common.toLowerCase().includes(searchValue)).length

    setSearchLength(realLength)
    console.log(realLength)
    // setCountries(filteredCountries)

  }

  

  return (
    <>
      <h1>Countries App</h1>
      <Search value={countries} handle={handleSearchChange} searchLength={searchLength} />
      <ListCountries countries={filteredCountries} search={search} searchLength={searchLength}/>
    </>
  )
}

export default App
