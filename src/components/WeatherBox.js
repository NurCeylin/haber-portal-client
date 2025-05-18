import React, { useEffect, useState } from 'react';
import './WeatherBox.css';

const WeatherBox = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/weather')
      .then(res => res.json())
      .then(data => setForecast(data))
      .catch(err => console.error('Hava verisi alınamadı:', err));
  }, []);

  const today = forecast[0] || {};

  return (
    <div
      className="weather-box"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/weather-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="current-weather">
        <h5 className="city-name">İzmir</h5>
        <div className="current-temp">{today.temp}</div>
        <div className="current-desc">{today.desc}</div>
      </div>

      <div className="forecast-row">
        {forecast.map((item, idx) => (
          <div key={idx} className="forecast-card">
            <div className="day">{item.day}</div>
            <div className="icon">{item.icon}</div>
            <div className="high">{item.high || item.temp}</div>
            <div className="low">{item.low || '--'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherBox;
