

function ForecastDay({ data, unit }) {
  console.log("data :",data)

  function getDateFormat(timestamp){
    let date=new Date(timestamp*1000)
    let day=date.getDay()
    let month=date.toLocaleString('en-US', { month: 'short' })
    return `${day}, ${month}`
  }
  return (
    <div className="flex  justify-center p-4 bg-white/40 backdrop-blur-sm rounded-xl shadow-md transition transform hover:scale-105 duration-300 w-1/5 min-w-[80px]">
      <p className="text-lg font-medium text-gray-800 mb-1">{data.dt_txt}</p>
      
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather icon" />
      <p className="text-sm font-semibold text-gray-900">
        {data.main.temp_max}°{unit}
      </p>
      <p className="text-xs text-gray-600">
        {data.main.temp_min}°{unit}
      </p>
    </div>
  );
}

export default ForecastDay;
