let username;
let timeOfDay;
let picIndex;
let imgFlag = true;
let city;
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityInput = document.querySelector('.city');
const nameInput = document.querySelector('.name');

String.prototype.formatCity = function () {
  let word = [];
  this.split(' ').forEach((item, index) => {
    word[index] = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  });
  return word.join(' ');
};

function showTime() {
  const time = document.querySelector('time');
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 500);
}

function showDate() {
  const date = document.querySelector('date');
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = today.toLocaleDateString('en-US', options);
  date.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours < 12) {
    return 'morning';
  }
  if (hours >= 12 && hours < 18) {
    return 'afternoon';
  }
  if (hours >= 18 && hours < 24) {
    return 'evening';
  }
  if (hours >= 0 && hours < 6) {
    return 'night';
  }
}

function showGreeting() {
  const greeting = document.querySelector('.greeting');
  timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay},`;
  if (username != '' && typeof username != 'undefined') {
    nameInput.value = username;
  }
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getURL() {
  if (typeof picIndex == 'undefined') {
    picIndex = getRandomNum(1, 20);
  }
  if ((picIndex + '').length == 1) {
    picIndex = '0' + picIndex;
  }

  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${picIndex}.jpg`;
}

function setBg() {
  imgFlag = false;
  const img = new Image();
  img.src = getURL();
  img.onload = () => {
    document.querySelector('body').style.backgroundImage = `url(${img.src})`;
  };
  setTimeout(function () { imgFlag = true }, 1000);
}

function nextImage() {
  if (imgFlag) {
    (picIndex != 20) ? picIndex++ : picIndex = 1;
    setBg();
  }
}

function prevImage() {
  if (imgFlag) {
    (picIndex != 1) ? picIndex-- : picIndex = 20;
    setBg();
  }
}

async function getWeather() {
  cityInput.setAttribute('value', city.formatCity());
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=a577b21df2838235e562dac66bb4f133&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  if (data.cod == '404') {
    cityInput.setAttribute('placeholder', 'Location');
    cityInput.value = '';
    temperature.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = `We couldn't find "${city}". Please, try another location :)`;
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    windSpeed.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
  }
}


cityInput.addEventListener('change', function () {
  city = cityInput.value;
  localStorage.setItem('city', city);
  getWeather();
});

window.addEventListener('load', function () {
  username = localStorage.getItem('username') || '';
  city = localStorage.getItem('city') || 'Minsk';
  showTime();
  showGreeting();
  setBg();
  getWeather('Minsk');
});


nameInput.addEventListener('change', function () {
  localStorage.setItem('username', nameInput.value);
});

document.querySelector('.slide-next').addEventListener('click', nextImage);
document.querySelector('.slide-prev').addEventListener('click', prevImage);





