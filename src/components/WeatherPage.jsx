import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastDay from "./ForecastDay";

const WeatherPage = () => {
  // State to hold the current city input and the temperature unit preference
  const [city, setCity] = useState("Hyderabad");
  const [unit, setUnit] = useState("C"); // C or F

  // State to hold the data fetched from the API
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(0)

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (newCity) => {
    if (newCity && newCity.trim() !== "") {
      setCity(newCity.trim());
      setSearchTrigger(prev => prev + 1); // Force re-fetch
      // Clear previous results when a new search starts
      setCurrentWeather(null);
      setForecastData([]);
      setError(null);
    }
  };

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  //fetch data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch Current Weather

      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!currentRes.ok && !forecastRes.ok) {
        throw new Error("City not found");
      }

      const currentData = await currentRes.json();
      const forecastList = await forecastRes.json();
     // console.log("currentData", currentData);
     // console.log("forecastList :", forecastList);
      // 2. Fetch  current weather &Forecast Data
      setCurrentWeather(currentData);
      setForecastData(forecastList);
    } catch (err) {
      // Handle API errors
      console.error("API Fetch Error:", err);
      setError(`Failed to fetch weather for "${city}"`);
      setCurrentWeather(null);
      setForecastData([]);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("forecastdata",forecastData)


  // EFFECT: Runs whenever the 'city' state changes to fetch new data
  useEffect(() => {
    if (!city) return;

    fetchData();
    // The dependency array ensures this runs only when 'city' changes
  }, [city,searchTrigger]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-indigo-500 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
          Weather Watcher
        </h1>

        {/* 1. SearchBar Component (Receives the callback function) */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Loading and Error Feedback */}
        {isLoading && (
          <div className="text-center text-white text-xl p-4 bg-black rounded-xl mb-6">
            Gathering data for {city}...
          </div>
        )}

        {error && (
          <div className="text-center text-red-100 bg-red-600/70 p-4 rounded-xl mb-6 font-semibold">
            {error}
          </div>
        )}

        {/* 2. CurrentWeatherCard Component (Receives the data) */}
        {currentWeather && <CurrentWeatherCard data={currentWeather} unit={unit} city={city} />}

        {/* 3. Forecast List (Iterates and renders ForecastDay components) */}
        {forecastData!==null&& Object.keys(forecastData).length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow-md">5-Day Outlook</h2>
            <div className="d-flex space-x-3 overflow-x-auto p-5">
              {forecastData.list.map((item, index) => (
                <ForecastDay key={index} data={item} unit={unit} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
