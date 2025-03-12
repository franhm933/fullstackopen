import CountryInfo from "./CountryInfo"
const ListCountries = ({countries, search, searchLength, handleShow}) => {
    console.log(countries)
    console.log(search)
    console.log('length: ', searchLength) 
    let advise = '';
    if(searchLength > 10 && search != null && search != '') {
        advise = 'Too many matches, specify another filter'
    } else if(search == null || search == '')  {
        advise = 'Type something to search'
    } else if(searchLength == 0) {
        advise = 'No results for this search'
    }
    return (
        <>
            
            
            {searchLength <= 10 && searchLength > 1 ? (
                <ul className="listCountries">
                    {countries.map(country => 
                        <li key={country.name.common}>{country.name.common} <button onClick={() => handleShow(country)}>Show</button></li>
                    )}
                </ul>
            ) : (
                <p>{advise}</p>
            )}
        </>
    )
}
export default ListCountries