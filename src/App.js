import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === 'See all cities' ? allEvents : allEvents.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    } catch (error) {
      setErrorAlert('Error fetching events. Please try again later.');
    }
  }

  useEffect(() => {
    if ('onLine' in navigator) {
      if (navigator.onLine) {
        setWarningAlert('');
      } else {
        setWarningAlert('You are offline. The displayed list may not be up to date.');
      }
    } else {
      // Handle case where navigator.onLine is not supported (older browsers)
      console.error('navigator.onLine is not supported in this browser.');
    }
    fetchData();
  }, [currentCity, currentNOE]);

  // define handleClick function
  const handleClick = (city) => {
    setCurrentCity(city);

    const filteredEvents = events.filter(event => event.location === city);
    setEvents(filteredEvents);
  }

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <ul>
        <li
          key="See all the cities"
          onClick={() => handleClick("See all cities")}
        >
          <b>See all cities</b>
        </li>
      </ul>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents setNumberOfEvents={setCurrentNOE} 
        setInfoAlert={setInfoAlert}
        setErrorAlert={setErrorAlert}
        setWarningAlert={setWarningAlert}
      />
      <div className='charts-container'>
        <EventGenresChart events={events}/>
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      
      <EventList events={events} />
    </div>
  );
}

export default App;