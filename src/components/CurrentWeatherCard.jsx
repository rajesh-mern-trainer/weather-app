const CurrentWeatherCard = ({ data, unit, city }) => {
  if (!data) return null;

  return (
    <div className="p-5 bg-light">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Current Weather in {data.name}</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-6xl mr-4">{data.icon}</span>
          <p className="text-7xl font-light text-gray-900">
            {data.main.temp}°{unit}
          </p>
        </div>
        <div className="text-right">
          <p>{data.condition}</p>
          <p className=" mt-2">Humidity: {data.main.humidity}</p>
          <p>Wind: {data.wind.speed}</p>
          <p>
            Feels Like: {data.main.feels_like}°{unit}
          </p>
        </div>
      </div>
    </div>
  );
};

const ForecastDay = ({ data, unit }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white/40 backdrop-blur-sm rounded-xl shadow-md transition transform hover:scale-105 duration-300 w-1/5 min-w-[80px]">
    <p className="text-lg font-medium text-gray-800 mb-1">{data.day}</p>
    <span className="text-3xl mb-2">{data.icon}</span>
    <p className="text-sm font-semibold text-gray-900">
      {data.high}°{unit}
    </p>
    <p className="text-xs text-gray-600">
      {data.low}°{unit}
    </p>
  </div>
);

export default CurrentWeatherCard;
