import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [country, setCountry] = useState(null);  // State to store country data
  const [search, setSearch] = useState('');      // State for search input

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
  }, [search]);       // [search] dependencies -- runs when  "search" state change

  return (
    <>
      <h1>Country Info</h1>

      {/* Search Bar */}
      <label id="search">
        <input
          type="text"
          placeholder="Please enter a country"
          value={search}
          onChange={(event) => setSearch(event.target.value)}  // Update search state on input change
        />
        <button onClick={() => getData(search)}>Go</button>
      </label>

      <div className="name">
        {/* Display country name or loading message */}
        {country ? (
          // `country.name.common` for displaying the country name
          <>
            {country.flags.svg}
            <p>{country.flags.alt}</p>
            <h3>{country.name.common}</h3>  
            <h3>{country.capital}</h3>
            <h3>{country.population}</h3>
            <h3>{country.languages}</h3>
            <h3>{country.currencies}</h3>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </>
  );
}

export default App;
