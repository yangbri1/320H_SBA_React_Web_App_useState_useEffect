import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // initialize state to hold user's search input
  const [search, setSearch] = useState('');      
  // create state to store country's data
  const [country, setCountry] = useState(null);

  // create state for time in country -- initial value of state being current system time
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(newDate());
    }, 1000);
  })

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
  }, [search]);       // [search] dependencies -- runs when  "search" state change

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
          <p style={{color: "#00b4d8"}}>{country.flags.alt}</p>
          <h2>{country.name.common}</h2>
          <h4>Capital: {country.capital}</h4>
          <h4>Population: {country.population.toLocaleString()}</h4>
          <h4>Languages: {Object.values(country.languages || {}).join(', ')}</h4>
          <h4>Currencies: {Object.values(country.currencies || {}).map((currency) => currency.name).join(', ')}</h4>
        </div>
      </>
    )
  }

  return (
    <>

      <h1 className='snowburst-one-regular'>Country Info</h1>

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


      {/* conditional rendering using ternary operator to display country (if it exists and has population property) or loading message */}
      {country && country.population ? loaded() : loading()}
    </>
  );
}

export default App;
