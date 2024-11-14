import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios';

function App() {
  // const [count, setCount] = useState(0)

  // create state to hold weather forecast
  // const [search, setSearch] = useState("");
  // const [weather, setWeather] = useState({});

  // create state to carry weather data -- initial value to null (workaround irregular errors in DOM compared to setting to "")
  const [weather, setWeather] = useState(null);

  // initialize Weather API key to const variable API_KEY
  const API_KEY = "aa37cadefc1679cd6669b048020034d2";

  // assign Weather base URL to const variable URL
  const URL = "https://api.openweathermap.org/data/2.5/";

  // let luckybtn; -- find out how many datapoints are in weather api
  // let current_location;
  // retrieve geo data from Weather API 
  // const deploySearch = () => {
  //   // console.log("Go ahead");
  //   // console.log(search);
  //   fetch(`${URL}weather?q=${search}&units=imperial&appid=${API_KEY}`)
  //   // convert response into JSON object format
  //   .then((response) => response.json())
  //   // output results to DOM
  //   .then((results) => {
  //     // console.log(results); // display "results" obj in DOM
  //     // set weather equivalent to results
  //     setWeather(results);
  //   });
  //   //https://api.openweathermap.org/data/2.5/weather?q=flint&units=metric&appid=aa37cadefc1679cd6669b048020034d2
  // };

  // going to be an "async" fn to pair with "await" fetch whenever accessing DB
  const getWeather = async(searchInput) => {
    // alongside a try-catch block for any extraneous errors
    try {
      // initialize response to empty string
      let response = "";
      // if the nothing was typed on search bar
      if(searchInput == ""){
        // generate random integer between 0-200,000 as Openweather API supports over 200,000 cities
        let luckyCity = Math.floor(Math.random() * 200001);
        // re-initialize response to a random city in database
        response = await axios.get(`${URL}weather?id=${luckyCity}&units=imperial&appid=${API_KEY}`);
      }
      // otherwise ...
      else{
        // fetch relative data from database pertaining to inputted city 
        response = await axios.get(`${URL}weather?q=${search}&units=imperial&appid=${API_KEY}`);
      }
    
      // parse out JSON obj from response
      const data = await response.json(); // might be response.data.json() -- since response.data in axios usually show everything
      // set "weather" state to previously accepted data
      setWeather(data);
      // if there were to be any errors ...
    } catch (err) {
      // execute out any errors to console
      console.error(err);
    }
  };

  // apply React useEffect() hook so it will run on first & not subsequent renders
  useEffect(() => {
    getWeather("");
  }, []); // empty list/array dependency -- initial render runs once

  return (
    <>
      <h1> Air Quality/Weather -- Travel (trip: long/lat, price)</h1>

      {/* Search Bar */}
      <label id="search">
        <input type="text" placeholder="Please enter a city" onChange={(event) => { setSearch(event.target.value)}} />
        <button onClick={getWeather}>Go</button>
      </label>
      <div className="weather">
        {/* Display Location -- accessing using dot notation in "results" obj*/}
        <h3>{weather.name}, {weather.sys.country}</h3>
        {/* Display Temperature */}
        <h4>{weather.main.temp}<sup> o</sup>F</h4>
        {/* Display Current Conditions */}
        <p>{weather.weather[0].main}</p>
        <p>{weather.weather[0].description}</p>
        
      </div>
      
      <div className="news"></div>

      <div className="flights">
        {/* Display Timezone */}
        <h3>{weather.timezone} ms</h3>
      </div>
          
      <div className="language"></div>
      
    </>
  )
}

export default App
