import { useState } from "react";
import Card from "./Card";
import Form from "./Form";

const WeatherPanel = () => {
  const apiKey = "53396fc0fab0b5ae624c4576c95c9be8";
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lang=es`;
  let cityUrl = "&q=";

  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&lang=es`;

  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    urlWeather = urlWeather + cityUrl + loc;

    await fetch(urlWeather)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((wheatherData) => {
        console.log("wheather", wheatherData);
        setWeather(wheatherData);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setShow(false);
      });

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((forecastData) => {
        console.log("forecast", forecastData);
        setForecast(forecastData);

        setLoading(false);
        setShow(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setShow(false);
      });
  };

  return (
    <div className="container">
      <Form newLocation={getLocation} />
      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </div>
  );
};

export default WeatherPanel;
