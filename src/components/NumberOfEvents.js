import { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents, setInfoAlert, setErrorAlert, setWarningAlert }) => {
  const [eventNumber, setEventNumber] = useState('32');

  const handleInputChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);

    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = 'Number of events cannot be negative';
      setErrorAlert(infoText);
    } else {
      infoText = '';
      setErrorAlert(infoText);
      setNumberOfEvents(value);
    }

    let infoTextNAN;
    if (isNaN(parsedValue)) {
      infoTextNAN = "Please enter a valid number";
      setInfoAlert(infoTextNAN);
    } else {
      infoTextNAN = '';
      setInfoAlert(infoTextNAN);
      setNumberOfEvents(parsedValue);
    }

    setEventNumber(value);
  }

  return (
    <div id="numberOfEvents">
      <label htmlFor="eventNumberInput">Number of Events</label>
      <input
        type="text"
        id="eventNumberInput"
        value={eventNumber}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NumberOfEvents;