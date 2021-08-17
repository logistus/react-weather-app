import { useContext, useState } from "react";
import { themes } from "./themes";
import {ThemeContext} from "./Provider";
import { Helmet } from "react-helmet";
import ThemeSwitch  from "./ThemeSwitch";
import './App.css';
import axios from "axios";

function App() {
  const { mode } = useContext(ThemeContext);
  const [searchCity, setSearchCity] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const fetchResults = async (e) => {
    e.preventDefault();
    if (searchCity) {
      setLoading(true);
      axios.get("https://api.weatherapi.com/v1/forecast.json?key="+process.env.API_KEY+"&q="+searchCity+"&days=3&aqi=no&alerts=no")
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

  const convertDate = (date, withHours = false) => {
    let dateString = days[new Date(date).getDay()] + ", " 
    + (new Date(date).getDate()) + " " 
    + months[new Date(date).getMonth()] + " "
    + new Date(date).getFullYear();
    if (withHours) {
      dateString += " at " + new Date(date).getHours() + ":" 
      + (new Date(date).getMinutes() < 10 ? "0" : "") + new Date(date).getMinutes();
    }
    return dateString;
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
      <div className= {results.current.is_day ? "weather-card is-day" : "weather-card is-night"}>
        <div className="weather-location">{results.location.name}, { results.location.country }</div>
        <div className="flex weather-dates">
          <small>{ convertDate(results.location.localtime) }</small>
          <small>Last update: { convertDate(results.current.last_updated, true) }</small>
        </div>
        <div className="flex weather-details">
          <div>
            <div className="weather-degree">{ results.current.temp_c } °C</div>
            <div>
              <img src={ results.current.condition.icon } alt={ results.current.condition.text } />
            </div>
            <div>Feels like { results.current.feelslike_c } °C</div>
            <div>{ results.current.condition.text }</div>
          </div>
          <div>
            <div>Humidity: { results.current.humidity }%</div>
            <div>Visibility: { results.current.vis_km } km</div>
            <div>Wind: { results.current.wind_kph } { results.current.wind_degree }° { results.current.wind_dir } kph</div>
          </div>
          <div>
            <div>UV Index: { results.current.uv }</div>
            <div>Pressure: { results.current.pressure_mb } mb</div>
            <div>Cloud: { results.current.cloud }%</div>
          </div>
        </div>
      </div>
      }
      { results !== "" && !loading && !error && results.forecast.forecastday.length > 0 && 
        <div className="forecast-days">
          { 
            results.forecast.forecastday.map((forecastday) => 
            <div className= {results.current.is_day ? "forecast-day is-day" : "forecast-day is-night"}>
              <div><strong>{new Date(forecastday.date).getDate() + " " + months[new Date(forecastday.date).getMonth()]}</strong></div>
              <div>{forecastday.day.maxtemp_c } °C / {forecastday.day.mintemp_c} °C</div>
              <div><img src={forecastday.day.condition.icon} alt={forecastday.day.condition.text} /></div>
              <div>{forecastday.day.condition.text}</div>
            </div>
            )
          }
        </div>
      }
    </div>
  );
}

export default App;
