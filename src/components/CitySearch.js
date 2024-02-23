import { useState, useEffect } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setShowSuggestions(filteredLocations); 
    };
  
  // const handleClick = (suggestion) => {
  //   setQuery(sugggestion);
  //   setShowSuggestions(false);
  //   setCurrentCity(suggestion);
  //   setInfoAlert("")
  // };
  
    useEffect(() => {
      setSuggestions(allLocations);
    }, [allLocations]);



  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestion ? <ul className='suggestion'>
         {suggestions.map((suggestion) => {
                        return (
                            <li onClick={() => handleClick(suggestion)} key={suggestion} >{suggestion}</li>
                        );
                    })}
            <li key='See all the cities' onClick={() => handleClick('See all cities')}>
              <b>See all cities</b>
            </li>
        </ul>
        : null
      }
    </div>
 )
}

export default CitySearch;