import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=f7330c9dfd3350d90ed655e16c60ff1a`;
  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch(console.error);

      searchLocation("");
    }
  };
  const current = new Date();
  const date = ` ${current.getDate()} / ${current.getMonth() + 1}`;
  const tomorrow = ` ${current.getDate() + 1} / ${current.getMonth() + 1}`;
  const afterTomorrow = ` ${current.getDate() + 2} / ${current.getMonth() + 1}`;

  return (
    <div className="App">
      <div className="container">
        <div className="displaySearch">
          <div className="city">
            {data.city ? <h1>{data.city.name}</h1> : <h1>enter the city</h1>}
          </div>
          <div className="search">
            <label htmlFor="search">city</label>
            <input
              type="text"
              value={location}
              id="search"
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
            />
          </div>
        </div>
        <div className="cont">
          <div>
            <h2>today{date}</h2>
          </div>
          
          <div className="temps">
            <div>{data.list ? <h1>{data.list[0].main.temp_min}°</h1> : ""}</div>
            <div>{data.list ? <h1>{data.list[0].main.temp_max}°</h1> : ""}</div>
          </div>
          <div className="describtion">
            {data.list ? <h3>describtion: {data.list[0].weather[0].description}</h3> : null}
          </div>
        </div>
        <div className="cont">
          <div>
            <h2>tomorrow {tomorrow}</h2>
          </div>
          <div className="temps">
            <div>{data.list ? <h1>{data.list[1].main.temp_min}°</h1> : ""}</div>
            <div>{data.list ? <h1>{data.list[1].main.temp_max}°</h1> : ""}</div>
          </div>

          <div className="describtion">
            {data.list ? <h3>describtion: {data.list[1].weather[0].description}</h3> : null}
          </div>
        </div>
        <div className="cont">
          <div>
            <h2>after tomorrow{afterTomorrow}</h2>
          </div>
          <div>{data.country}</div>
          
          <div className="temps">
            <div>{data.list ? <h1>{data.list[2].main.temp_min}°</h1> : ""}</div>
            <div>{data.list ? <h1>{data.list[2].main.temp_max}°</h1> : ""}</div>
          </div>
          <div className="describtion">
            {data.list ? <h3>describtion: {data.list[2].weather[0].description}</h3> : null}
          </div>
        </div>
      </div>
      <div className="second_cont">
        <div>
          <h1>today feels like</h1>
        </div>
        <div>{data.list ? <h1>{data.list[0].main.temp}°</h1> : ""}</div>
      </div>
    </div>
  );
}

export default App;
