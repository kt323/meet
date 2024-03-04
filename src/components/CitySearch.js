import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log(allLocations)
    setSuggestions(allLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);

  //   let infoText;
  //   if (filteredLocations.length === 0) {
  //     infoText =
  //       "City you are looking for was not found. Search for another city";
  //   } else {
  //     infoText = "";
  //   }

  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

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
      {showSuggestions ?
       <ul className="suggestions">
         {suggestions.map((suggestion) => {
           return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
         })}
         <li key='See all cities' onClick={handleItemClicked}>
           <b>See all cities</b>
         </li>
       </ul>
       : null
     }
    </div>
  );
};

export default CitySearch;
