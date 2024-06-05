import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import './index.css';
import Background from "../src/images/bg-light.png";
import SUN from "../src/images/sun.png";

const App = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = useCallback((query, data) => {

    setWeatherData(data);
    setSearchHistory((prevHistory) => {
      let prevHistoryArr = [...prevHistory].filter(({ data: itemData }) => {
        const { location } = itemData;
        return location.lat !== data.location.lat && location.lon !== data.location.lon
      });
      return [{ query, data }, ...prevHistoryArr];
    });
  }, []);

  const onRemoveHistoryItem = (query) => {
    console.log(query);
    setSearchHistory((prevHistory) => {
      return [...prevHistory].filter((item) => {
        return query !== item.query
      });
    });
  }

  return (
    <main className="relative">
      <img src={Background} className="absolute top-0 left-0 z-[-1]" alt="background" />
      <div className="max-w-[800px] mx-auto p-4 relative pt-10">
        <SearchBar onSearch={handleSearch} />
        {weatherData && (
          <div className="p-10 border flex flex-col justify-center items-start gap-3 bg-[#C1ABE9] rounded-3xl relative mt-[100px]">
            <img src={SUN} className="absolute right-5 top-[-100px]" alt="sun" width={300} height={300} />
            <h2 className="text-xl font-semibold">Today's Weather</h2>
            <div>
              <p className="text-[100px] font-bold text-primary">{weatherData.current.temp_c}°</p>
            </div>
            <div className="flex justify-center items-start gap-3">
              <p className="text-lg font-bold">H: {weatherData.current.pressure_mb}°</p>
              <p className="text-lg font-bold">L: {weatherData.current.pressure_in}°</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className='text-lg text-gray-700 font-bold'>{weatherData.location.name}, {weatherData.location.country}</p>
              <p className='text-lg text-gray-700'>{weatherData.timeSearch}</p>
              <p className='text-lg text-gray-700'>Humidity: {weatherData.current.humidity}</p>
              <p className='text-lg text-gray-700'>{weatherData.current.condition.text}</p>
            </div>

            <SearchHistory history={searchHistory} onRemoveHistoryItem={onRemoveHistoryItem} />
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
