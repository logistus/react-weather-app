import { useContext, useState } from "react";
import { themes } from "./themes";
import {ThemeContext} from "./Provider";
import { Helmet } from "react-helmet";
import ThemeSwitch  from "./ThemeSwitch";
import './App.css';
import axios from "axios";
import env from "react-dotenv";
import ForecastDay from "./components/ForecastDay";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const { mode } = useContext(ThemeContext);
  const [searchCity, setSearchCity] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResults = async (e) => {
    e.preventDefault();
    if (searchCity) {
      setLoading(true);
      axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${env.API_KEY}&q=${searchCity}&days=3&aqi=no&alerts=no`)
        .then(response => {
          setError("");
          setResults(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err.response);
          setLoading(false);
          setError(err.response.data.error.message);
        });
    } else {
      alert("Enter city please");
    }
  }

  return (
    <div className="container">
      <ThemeSwitch />
      <Helmet>
        <style>{'body { background-color:'+themes[mode].backgroundColor+'; color: '+themes[mode].color+';}'}</style>
      </Helmet>
      <h1>React Weather App</h1>
      <form onSubmit={fetchResults}>
        <input type="text" placeholder="Enter your city" id="city" value={searchCity} onChange={e => setSearchCity(e.target.value)} className={'city city-'+themes[mode].name} />
        <button id="fetchCity" className={'btn btn-'+themes[mode].name} type="submit" onClick={fetchResults}>Submit</button>
      </form>
      { error !== "" && <div>{ error }</div> }
      { loading && <div>Loading...</div> }
      { results !== "" && !loading && !error && 
        <CurrentWeather results={results} />
      }
      { results !== "" && !loading && !error && results.forecast.forecastday.length > 0 && 
        <div className="forecast-days">
          { 
            results.forecast.forecastday.map((forecastday) => 
              <ForecastDay forecastday={forecastday} is_day={results.current.is_day} />
            )
          }
        </div>
      }
    </div>
  );
}

export default App;
