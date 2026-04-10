const locationName = document.querySelector(".location-name");
const weatherImage = document.querySelector(".weatherImage");
const weatherTelop = document.querySelector(".telop");
const temperature = document.querySelector("#temperature");

const setBackgroundImage = function (weatherCode) {
  if (weatherCode <= 1) {
    document.body.style.backgroundImage = "url('images/sunny.jpg')";
  } else if (weatherCode <= 3) {
    document.body.style.backgroundImage = "url('images/cloudy.jpg')";
  } else {
    document.body.style.backgroundImage = "url('images/rainy.jpg')";
  }
};

const Weather = function (weatherCode) {
  if (weatherCode <= 1) {
    return ["images/tennki-illust2.png", "晴れ"];
  } else if (
    (61 <= weatherCode && weatherCode <= 65) ||
    (80 <= weatherCode && weatherCode <= 82)
  ) {
    return ["images/tennki-illust7.png", "雨"];
  } else if (weatherCode == 2) {
    return ["images/tennki-illust14.png", "曇りのち晴れ"];
  } else if (weatherCode == 3) {
    return ["images/tennki-illust5.png", "曇り"];
  }
};

const calculateDay = function (dayCode) {
  switch (dayCode) {
    case 0:
      return "日";
    case 1:
      return "月";
    case 2:
      return "火";
    case 3:
      return "水";
    case 4:
      return "木";
    case 5:
      return "金";
    case 6:
      return "土";
  }
};

window.addEventListener("load", () => {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&daily=weathercode,precipitation_sum,temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Asia%2FTokyo",
  )
    .then((response) => response.json())
    .then((forecasts) => {
      console.log(forecasts);
      locationName.textContent = forecasts.timezone;
      console.log(forecasts.daily.weathercode[0]);

      const weatherCode = forecasts.daily.weathercode[0];

      [weatherImage.src, weatherTelop.textContent] = Weather(weatherCode);
      setBackgroundImage(weatherCode);
      console.log(weatherImage);
      // weatherImage.src = 'images/tennki-illust5.png';

      document.querySelector(".humid").textContent =
        `湿度：${forecasts.current.relative_humidity_2m}%`;
      document.querySelector(".wind").textContent =
        `風速：${forecasts.current.wind_speed_10m}m`;

      temperature.textContent = forecasts.current.temperature_2m + "℃";

      const listItem = document.querySelector(".forecasts-display");

      listItem.innerHTML = "";

      for (let i = 1; i < forecasts.daily.time.length; i++) {
        const weatherItem = document.createElement("li");
        const [year, month, day] = forecasts.daily.time[i]
          .split("-")
          .map(Number);
        const Day = new Date(year, month - 1, day);
        const code = forecasts.daily.weathercode[i];
        const [temp_max, temp_min] = [
          forecasts.daily.temperature_2m_max[i],
          forecasts.daily.temperature_2m_min[i],
        ];
        weatherItem.className = "weatherItem";
        const [img, telop] = Weather(code);

        console.log(document.body.clientWidth);

        if (document.body.clientWidth < 800) {
          weatherItem.innerHTML = `
                        <h2>${month}月${day}日(${calculateDay(Day.getDay())})</h2>
                        <div class="sub-list">
                            <img class="weatherImage-sub" src="${img}" alt="">
                            <div class="temp">
                                <p class="sub-temp">最高：${temp_max}℃</p>
                                <p class="sub-temp">最低：${temp_min}℃</p>
                            </div>
                        </div>
                    `;
        } else {
          weatherItem.innerHTML = `
                        <h2>${month}月${day}日(${calculateDay(Day.getDay())})</h2>
                        <img class="weatherImage-sub" src="${img}" alt="">
                        <div class="temp">
                            <p class="sub-temp">最高：${temp_max}℃</p>
                            <p class="sub-temp">最低：${temp_min}℃</p>
                        </div>
                    `;
        }
        listItem.appendChild(weatherItem);
      }
    })
    .catch((error) => {
      console.log("Error : ", error);
    });
});
