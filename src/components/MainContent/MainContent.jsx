import React, { useState } from "react";
import { apiKey } from "../../config";
import axios from "axios";
import "./MainContent.css";

const MainContent = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState({});

  const fetchTemperature = async () => {
    if (!city) return alert("Please Type a City Name");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setResult({
        name: res.data.name,
        temp: res.data.main.temp,
        country: res.data.sys.country,
      });
      setCity("");
    } catch (err) {
      if (err.response.status === 404)
        return alert("City Information Can't be Fetched.");
      console.log(err);
      alert("Internal Server Error!");
    }
  };

  return (
    <div className="main">
      <div className="content">
        <div className="content">
          <div className="container">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="city"
              placeholder="Enter City Name"
            />{" "}
            <button onClick={fetchTemperature}>Search</button>
          </div>
        </div>
        {Object.keys(result).length ? (
          <div className="content">
            <div className="container">
              <h1 className="text-center">
                {result.name} <sup className="super">{result.country}</sup>
              </h1>
              <h4 className="text-center">{result.temp} &deg;C</h4>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MainContent;
