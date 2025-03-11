const ListCountries = ({countries, search, searchLength}) => {
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
            
            
            {searchLength == 1 ? (
                <div>
                    <h2>{countries[0].name.common}</h2>
                    <p>Capital: {countries[0].capital}</p>
                    <p>Area: {countries[0].area}</p>
                    <h3>Languages</h3>
                    <ul>
                        {Object.values(countries[0].languages).map(language => 
                            <li key={language}>{language}</li>
                        )}
                    </ul>
                    <img width="300" src={countries[0].flags.svg} alt={countries[0].flags.alt} />
                </div>
            ) : searchLength <= 10 && searchLength > 1 ? (
                <ul className="listCountries">
                    {countries.map(country => 
                        <li key={country.name.common}>{country.name.common}</li>
                    )}
                </ul>
            ) : (
                <p>{advise}</p>
            )}
        </>
    )
}
export default ListCountries