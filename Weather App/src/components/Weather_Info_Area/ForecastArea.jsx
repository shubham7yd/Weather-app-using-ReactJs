import React from "react";

export default function ForecastArea({ data, timezone, temp_unit }) {
  const localTime = new Date(data.list[0].dt * 1000);
  const today = getLocalDate(localTime, timezone);
  
  // Create an array of dates for the next 5 days
  const forecastDates = [];
  for (let i = 0; i < 5; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);
    forecastDates.push(forecastDate);
  }

  return (
    <div className="forecast-info center">
      {forecastDates.map((forecastDate, dayIndex) => (
        <div key={dayIndex}>
          <h2 className="title">
            Forecast for{" "}
            {forecastDate.toLocaleString("en", {
              weekday: "long",
            })}
          </h2>
          <div className="hourly-weather-list">
            {data.list.map((item, index) => (
              <HourlyWeather
                data={item}
                key={index}
                date={forecastDate.getDate()}
                timezone={timezone}
                temp_unit={temp_unit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HourlyWeather({ data, date, timezone, temp_unit }) {
  const localTime = new Date(data.dt * 1000);
  const currentDate = getLocalDate(localTime, timezone);
  if (date !== currentDate.getDate()) return null;
  const time = currentDate.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="hourly-weather-item">
      <p className="time">{time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
      <p className="description">{data.weather[0].description}</p>
      <p className="temp">
        {data.main.temp}{" "}
        {temp_unit === "c" ? <span> &#8451; </span> : <span> &#8457; </span>}
      </p>
    </div>
  );
}

// For converting local time to UTC date by given timezone
function getLocalDate(date, timezone) {
  const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
  const localDate = utcDate + timezone * 1000;
  return new Date(localDate);
}
