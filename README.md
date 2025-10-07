# Weather app with React

### API

- https://openweathermap.org/api
- Use **Current Weather Data** for current weather data & **5 Day / 3 Hour Forecast** for forrecast info

### Libraries used

- react-hook-form
- bootstrap
- react-bootstrap

### App architecture

src/
├── components/
│ ├── WeatherPage.jsx
│ ├── ForecastDay.jsx   // Displays a single forecast day
│ ├── CurrentWeatherCard.jsx // Displays main current weather data
│ └── SearchBar.jsx // Handles user input for city name  
└── App.jsx // Root component, mostly just rendering WeatherPage


### Sample UI
![Weather app sample UI](/src/assets/sample-ui.png)


### Component architecture
![Component tree](/src/assets/component_tree.png)
