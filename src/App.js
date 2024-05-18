import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import PieChartComponent from './components/PieChartComponent';

import './App.css';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const getData = () => {
    const data = allLocations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(",").shift();
      return { city, number };
    });
    return data;
  };

  console.log(getData());

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch 
      allLocations={allLocations} 
      setCurrentCity={setCurrentCity} />
      <NumberOfEvents 
      setCurrentNOE={setCurrentNOE}
      />
      <PieChartComponent width="100%" height="100%"  events={events} >
      </PieChartComponent>
           <ResponsiveContainer height={400}>
                <ScatterChart
                  className="scatter-chart"
                  width={700}
                  height={400}
                  margin={{
                    top: 20,
                    right: 50,
                    bottom: 20,
                    left: 0,
                  }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="category"
                    dataKey="city"
                    name="city"
                    allowDecimals={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="number"
                    name="number of events"
                    allowDecimals={false}
                  />

                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={getData()} fill="#483d8b" />
                </ScatterChart>
              </ResponsiveContainer>  
      <EventList events={events} />
      
    </div>
  );
}

export default App;