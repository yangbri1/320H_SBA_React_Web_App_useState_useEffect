import { useState } from 'react'
import './App.css'

import axios from 'axios';

function App() {
  // const [count, setCount] = useState(0)

  // create state to hold weather forecast
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  // initialize Weather API key to const variable API_KEY
  const API_KEY = "a14dc28007fe16e9d237f31fe1c5ff3e";

  // assign Weather base URL to const variable URL
  const URL = "https://api.openweathermap.org/data/2.5/";

  // let luckybtn; -- find out how many datapoints are in weather api
  // let current_location;
  // retrieve geo data from Weather API 
  const deploySearch = () => {
    // console.log("Go ahead");
    // console.log(search);
    fetch(`${URL}weather?q=${search}&units=imperial&appid=${API_KEY}`)
    // convert response into JSON object format
    .then((response) => response.json())
    // output results to DOM
    .then((results) => {
      console.log(results); // display "results" obj in DOM
      // set weather equivalent to results
      setWeather(results);
    });
    //https://api.openweathermap.org/data/2.5/weather?q=flint&units=metric&appid=aa37cadefc1679cd6669b048020034d2
  };

  return (
    <>
      <h1> Air Quality/Weather -- Travel (trip: long/lat, price)</h1>

      {/* Search Bar */}
      <label id="search">
        <input type="text" placeholder="Please enter a city" onChange={(event) => { setSearch(event.target.value)}} />
        <button onClick={deploySearch}>Go</button>
      </label>
      <div className="weather">
        {/* Display Location -- accessing using dot notation in "results" obj*/}
        {/* <h3>{weather.name}</h3> */}
        {/* Display Temperature */}
        {/* <h4>{weather.name}</h4> */}
        {/* Display Current Conditions */}
        {/* <p>{weather.weather[0].description}</p>
        <p>{weather.weather[0].icon}</p> */}
        
      </div>
      
      <div className="news"></div>

      <div className="flights">
        {/* Display Timezone */}
        {/* <h3>{weather.sys.country}</h3> */}
      </div>
          
      <div className="language"></div>
      
    </>
  )
}

export default App
