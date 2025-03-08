const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const apiKey = "0256879dbeb5db4bea0ddaae6133b647";
const now = dayjs();
const InputElement = document.querySelector(".input");
const searchBTN = document.querySelector(".search__icon");
const weathercontainer = document.querySelector(".output-container");
const error = document.querySelector(".error");
error.parentElement.style.display = "none";
weathercontainer.style.display = "none";
async function getWeather() {
  const city = InputElement.value;
  const response = await fetch(url + `&q=${city}` + `&appid=${apiKey}`);
  const weather = await response.json();
  InputElement.value = "";
  if (weather.cod === "404") {
    error.parentElement.style.display = "block";
    weathercontainer.style.display = "none";
  } else {
    error.parentElement.style.display = "none";
    weathercontainer.style.display = "block";
    renderWeather(weather);
  }
}
searchBTN.addEventListener("click", () => {
  getWeather();
});

InputElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

let weatherHTML = "";
function renderWeather(weather) {
  const sunriseTimestamp = weather.sys.sunrise;
  const sunsetTimestamp = weather.sys.sunset;
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();
  let src = "";
  if (weather.weather[0].main === "Clouds") {
    src = "./images/cloudy.svg";
  } else if (weather.weather[0].main === "Clear") {
    src = "./images/day.svg";
  }
   else if (weather.weather[0].main === "Rain") {
    src = "./images/rainy-6.svg";
   }
   else if (weather.weather[0].main === "Drizzle") {
    src = "./images/rainy-1.svg";
   }
   else if (weather.weather[0].main === "Mist") {
    src = "./images/rainy-4.svg";
   }
   else if (weather.weather[0].main === "Mist") {
    src = "./images/rainy-4.svg";
   }
   else if (weather.weather[0].main === "Thunderstorm") {
    src = "./images/thunder.svg";
   }
   else if (weather.weather[0].main === "Snow") {
    src = "./images/snowy.svg";
   }
   else if (weather.weather[0].main === "Fog") {
    src = "./images/snowy-2.svg";
   }
   else if (weather.weather[0].main === "Haze") {
    src = "./images/snowy-4.svg";
   }
  weatherHTML = `<div class="output-content">
          <div class="main-condition">
            <h1 class="city-name">${weather.name}</h1>
          </div>
          <div class="main-condition">
            <h1 class="temparature-degree">${Math.round(
              weather.main.temp
            )}&deg;c</h1>
            <img src="${src}" class="condition-img" />
            <p class="condition">${weather.weather[0].main}</p>
          </div>
          <div class="other-details">
            <div class="wind">
              <img src="./images/wind.svg" alt="" />
              <p>wind Speed</p>
              <p>${weather.wind.speed} km/hr</p>
            </div>
            <div class="humidity">
              <img src="./images/humidity.svg" alt="" />
              <p>Humidity</p>
              <p>${weather.main.humidity}%</p>
            </div>
            <div class="pressure">
              <img src="./images/pressure.svg" alt="" />
              <p>Pressure</p>
              <p>${weather.main.pressure}hPa</p>
            </div>
            <div class="sunset">
              <img src="./images/sunrise.svg" alt="" />
              <p>${sunrise}            ${sunset}</p>
              <p>Sunrise \t\t\tSunset</p>
              <p></p>
            </div>
          </div>
        </div>`;
  weathercontainer.innerHTML = weatherHTML;
}
