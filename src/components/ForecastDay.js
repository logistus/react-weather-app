import { months } from "../consts";

function ForecastDay(props)  {
  return (
    <div className= {props.is_day ? "forecast-day is-day" : "forecast-day is-night"} key={props.forecastday.date_epoch}>
      <div><strong>{new Date(props.forecastday.date).getDate() + " " + months[new Date(props.forecastday.date).getMonth()]}</strong></div>
      <div>{props.forecastday.day.maxtemp_c } °C / {props.forecastday.day.mintemp_c} °C</div>
      <div><img src={props.forecastday.day.condition.icon} alt={props.forecastday.day.condition.text} /></div>
      <div>{props.forecastday.day.condition.text}</div>
    </div>
  );
}

export default ForecastDay;