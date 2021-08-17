import React, { useState, useEffect } from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";

const App = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState("");

  const getData = () => {
    fetch('test-data.json')
    .then((resp) => resp.json())
    .then((resp) => setData(resp))
    .catch((er) => setError("Malformed input data"));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <EditableSection
        startDate={startDate}
        endDate={endDate}
        location={location}
        onStartDateChange={(date) => {setStartDate(new Date(date))}}
        onEndDateChange={(date) => {setEndDate(new Date(date))}}
        onLocationChange={(e) => {setLocation(e.currentTarget.value)}}
      />
      <div className="editable-section">
        {data && data.length > 0 && data.filter((el) => {
          //Improperly formatted dates return "Invalid Date" when the .toString() is called
          if ((new Date(el.date)).toString() === "Invalid Date") return false;

          const isAfterStartDate = startDate ? (new Date(el.date)) >= (new Date(startDate)) : true;
          const isBeforeEndDate = endDate ? (new Date(el.date)) <= (new Date(endDate)) : true;
          const isLocation = location ? el.town.toUpperCase() === location.toUpperCase() : true;

          return isAfterStartDate && isBeforeEndDate && isLocation;
        }).map((item) => (
          <WeatherCard
            date={item.date}
            weather={item.weather}
            location={item.town}
          />
        ))}
        {error && (<div>{error}</div>)}
      </div>
    </div>
  );
} 


export default App;
