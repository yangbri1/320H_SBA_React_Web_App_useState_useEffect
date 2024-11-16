// import useState() hook to hold form data, useEffect() React hook to make API calls
import { useState, useEffect } from 'react';
import './App.css';
// import axios to fetch data from database
import axios from 'axios';
// import <Link> component from React Router library (normally to navigate b/t components ...)
// import { Link } from 'react-router-dom';

// import Nav from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import duckLogo from './assets/duck.svg'
function App() {
  // initialize state to hold user's search input
  const [search, setSearch] = useState('');      
  // create state to store country's data
  const [country, setCountry] = useState(null);

  // create state for time in country -- initial value of state being current system time
  const [time, setTime] = useState(() => new Date());


  // "async"/"await" pairing to fetch from database
  const getData = async (searchInput) => {
    // try-catch block to catch any potential errors
    try {
      // initialize response to empty String ... later will be re-declared
      let response = "";
      // if user does NOT input a String ...
      if (searchInput == "") {
        // fetch ALL of the countries from database in JSON format
        response = await axios.get('https://restcountries.com/v3.1/all');
        // ... select a random country from the array of countries
        const randomCountry = response.data[Math.floor(Math.random() * response.data.length)];
        // sets "country" state value now to this randomly chosen country
        setCountry(randomCountry);
      } 
      // if user does input a country
      else {
        // filter database for the inputted country name
        response = await axios.get(`https://restcountries.com/v3.1/name/${searchInput}`);
        // Aside: response.data form in axios usually show bulk of data
        // set "country" value to first country in response as sometimes there may be numerous countries sharing similar name (ex. Two Korea's)
        setCountry(response.data[0]); 
      }
    // under the premise of an error
    } catch (err) {
      // output error to console
      console.error(err);  
    }
  };

  // useEffect() React hook to fetch data on initial render
  useEffect(() => {
    getData(search);  // retrieve data w/ initial value (recall empty at start)
  }, []);       // [search] dependencies -- runs when "search" state change (in this case per keystroke)
                // instead we leave list/array [] for dependencies so it will only change upon initial render -- click event later

  const loading = () => {
    return(<h1>Loading...</h1>)
  }

  function loaded(){
    return(
      <>
        {/* Flag & Coat of Arms */}
        <div className="row" style={{display: "flex", gap: "10px"}}>
          <div className="column">
            <img src={country.flags.svg} id="flag" name="flag" alt={`flag of ${country.name.common}`} />
          </div>
          <div className="column">
            <img src={country.coatOfArms && country.coatOfArms.svg ? country.coatOfArms.svg : "https://tenor.com/view/pato-caminando-cheli-gif-24693863"} id="coatOfArms"name="coatOfArms" alt={`${country.name.common}'s Coat of Arms`} />
          </div>
        
        </div>
        {/* Description of the country*/}
        <div className="description">
          <p style={{color: "#333333"}}><i>{country.flags.alt}</i></p>
          <h2>{country.name.common}</h2>
          <h4><b>Capital:</b> <i>{country.capital}</i></h4>
          <h4>Population: <i>{country.population.toLocaleString()}</i></h4>
          <h4>Languages: <i>{Object.values(country.languages || {}).join(', ')}</i></h4>
          <h4>Currencies: <i>{Object.values(country.currencies || {}).map((currency) => currency.name).join(', ')}</i></h4>
        </div>
        <div className="info-btn">
          <footer>
            {/* button re-direct to map of searched country */}
            <button className="map-btn">
              <a href={country.maps.openStreetMaps} target="_blank" style={{color: "black"}}>Map</a>
            </button>
            {/* normal anchor tags works in React when opening a new tab("_blank") to re-direct
            but if want the current page to re-direct, it will re-render and loses all previous data */}
            <button className="api-btn">
              <a href={"https://restcountries.com/#endpoints-name"} target="_blank">API Resource</a>
            </button>
          </footer>
        </div>
      </>
    )
  }

  return (
    <>
    {/* React Bootstrap Navbar */}
      <Navbar id="navbar" sticky="top" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" style={{color: '#00B8D9'}}>
            <img
              alt="Duck ducks"
              src={duckLogo}
              width="30"
              height="30"
              className="d-inline-block float-start"
            />{' '}
            Destination
          </Navbar.Brand>
        </Container>
      </Navbar>
      {/* <a href="https://www.svgrepo.com/vectors/duck/" target="_blank">
        <img src={duckLogo} className="duck" alt="Duck ducks" />
      </a> */}
      
      {/* applying Google Fonts styling to <h1> header tag */}
      <h1 className='snowburst-one-regular'>Country Info</h1>
      {/* Search Bar */}
      <label htmlFor="search-bar">
        <input
          type="text"
          placeholder="Please enter a country"
          value={search}
          onChange={(event) => setSearch(event.target.value)}  // Update search state on input change
        />
        <button onClick={() => getData(search)}>Go</button>
      </label>
      
      {/* conditional rendering using ternary operator to display country (if it exists and has population property) or loading message */}
      {country && country.population ? loaded() : loading()}

    </>
  );
}

export default App;
