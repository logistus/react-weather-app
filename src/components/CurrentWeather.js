import { days, months } from "../consts";

function CurrentWeather(props) {
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
    <div className= {props.results.current.is_day ? "weather-card is-day" : "weather-card is-night"}>
        <div className="weather-location">{props.results.location.name}, { props.results.location.country }</div>
        <div className="flex weather-dates">
          <small>{ convertDate(props.results.location.localtime) }</small>
          <small>Last update: { convertDate(props.results.current.last_updated, true) }</small>
        </div>
        <div className="flex weather-details">
          <div>
            <div className="weather-degree">{ props.results.current.temp_c } °C</div>
            <div>
              <img src={ props.results.current.condition.icon } alt={ props.results.current.condition.text } />
            </div>
            <div>Feels like { props.results.current.feelslike_c } °C</div>
            <div>{ props.results.current.condition.text }</div>
          </div>
          <div>
            <div>Humidity: { props.results.current.humidity }%</div>
            <div>Visibility: { props.results.current.vis_km } km</div>
            <div>Wind: { props.results.current.wind_kph } { props.results.current.wind_degree }° { props.results.current.wind_dir } kph</div>
          </div>
          <div>
            <div>UV Index: { props.results.current.uv }</div>
            <div>Pressure: { props.results.current.pressure_mb } mb</div>
            <div>Cloud: { props.results.current.cloud }%</div>
          </div>
        </div>
      </div>
  );
}

export default CurrentWeather;