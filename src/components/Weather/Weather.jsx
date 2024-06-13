

import{ useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  // const [iconUrl, setIconUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch weather data using current coordinates
       
        
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
          );

          setWeatherData(response.data);

          // Extract weather icon code and generate icon URL
          // const iconCode = response.data.weather[0].icon;
          // const iconBaseUrl = 'https://openweathermap.org/img/wn/';
          // const url = `${iconBaseUrl}${iconCode}@2x.png`;
          // setIconUrl(url);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='text-sm text-right ml-2 text-white'>
      {weatherData ? (
        <>
          {/* Display weather icon */}
          {/* {iconUrl && <img src={iconUrl} alt="Weather Icon" />} */}
           <p className='text-bold'>{weatherData.name}</p>

          {/* Display temperature */}
          <p> {weatherData.main.temp}°C</p>

          {/* Additional weather data can be displayed here */}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;