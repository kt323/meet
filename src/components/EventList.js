import Event from "./Event";

const EventList = ({ events }) => {
    return (
        <div className="App">
          <CitySearch />
          <NumberOfEvents />
          <EventList events={events} />
        </div>
      );
   }
  
  export default EventList;