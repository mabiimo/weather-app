import "./App.css";
import React, { useState } from "react";

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "e2f4f76bd5b1f075a1facd0cef88fee1",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (hasil) => {
    if (hasil.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let moths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = moths[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={typeof weather.main != "undefined" ? (weather.main.temp > 16 ? "app warm" : "app") : "app"}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weater-box">
              <div className="temp" type="text">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
