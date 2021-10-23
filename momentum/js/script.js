import playList from '../js/playList.js';

let username;

let timeOfDay;
let picIndex;
let imgFlag = true;

let audioFlag = false;
let audioIndex = 0;

let city;

let tempVolume = 0;

// true for EN, false for RU
let lang;
let language = localStorage.getItem('language') || 'en';
if (language == 'en') {
  lang = true;
} else {
  lang = false;
}

let source = localStorage.getItem('source') || 'github';


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityInput = document.querySelector('.city');
const nameInput = document.querySelector('.name');
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const audio = document.querySelector('audio');
const button = document.querySelector('.play');
const currentDuration = document.querySelector('.current-duration');
const fullDuration = document.querySelector('.full-duration');
const trackName = document.querySelector('.track-name');
const progressBar = document.getElementById('progress-bar');
const volume = document.getElementById('volume-bar');
const settingsMenu = document.querySelector('.settings');
const settingsIcon = document.querySelector('.settings-icon');
const settingsClose = document.querySelector('.settings-close');

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
  const region = (lang) ? 'en-US' : 'ru-RU';
  const currentDate = today.toLocaleDateString(region, options);
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
  if (lang) {
    greeting.textContent = `Good ${timeOfDay},`;
  } else {
    if (timeOfDay == 'morning') {
      greeting.textContent = 'Доброе утро, ';
    }
    if (timeOfDay == 'afternoon') {
      greeting.textContent = 'Добрый день, ';
    }
    if (timeOfDay == 'evening') {
      greeting.textContent = 'Добрый вечер, ';
    }
    if (timeOfDay == 'night') {
      greeting.textContent = 'Спокойной ночи, ';
    }
  }
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

function setBgGH() {
  imgFlag = false;
  const img = new Image();
  img.src = getURL();
  img.onload = () => {
    document.querySelector('body').style.backgroundImage = `url(${img.src})`;
  };
  setTimeout(function () { imgFlag = true }, 1000);
}


function getLinkToImage() {
  const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=dtkO_hag5StGhJA-3odxAVROrP3c94nDFKGbf8HCMtA';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.urls.regular)
    });
}

function nextImage() {
  if (imgFlag) {
    (picIndex != 20) ? picIndex++ : picIndex = 1;
    setBgGH();
  }
}

function prevImage() {
  if (imgFlag) {
    (picIndex != 1) ? picIndex-- : picIndex = 20;
    setBgGH();
  }
}

async function getWeather() {
  cityInput.setAttribute('value', city.formatCity());
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=a577b21df2838235e562dac66bb4f133&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  if (data.cod == '404') {
    cityInput.setAttribute('placeholder', 'Location');
    cityInput.value = '';
    temperature.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = lang ?
      `We couldn't find "${city}". Please, try another location.` :
      `Мы не смогли найти "${city}". Пожалуйста, введите другую локацию.`;
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    windSpeed.textContent = lang ?
      `Wind speed: ${Math.floor(data.wind.speed)} m/s` :
      `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
    humidity.textContent = lang ?
      `Humidity: ${data.main.humidity}%` :
      `Влажность: ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
  }
}

async function getQuotes() {
  const url = `https://raw.githubusercontent.com/saratovkin/momentum-quotes/main/${language}-quotes.json`;
  const res = await fetch(url);
  const data = await res.json();
  const quote = data[getRandomNum(0, data.length - 1)];
  quoteText.innerHTML = `"${quote.text}"`;
  quoteAuthor.innerHTML = quote.author;
}

function playAudio() {
  if (!audioFlag) {
    audio.currentTime = 0;
    audio.play();
    audioFlag = true;
    showMarkers();
  } else {
    audio.pause();
    hideMarkers();
    audioFlag = false;
  }
  toggleBtn();
}

function showMarkers() {
  hideMarkers();
  document.querySelector(`.play-list .play-item:nth-child(${audioIndex + 1})`).classList.add('item-active');
}

function hideMarkers() {
  document.querySelectorAll('.play-list .play-item').forEach(item => {
    item.classList.remove('item-active');
  });
}

function playNext(i) {
  if (typeof i == 'object') {
    audioIndex++;
  } else {
    audioIndex = i;
  }
  if (audioIndex > 3) {
    audioIndex = 0;
  }
  audio.src = playList[audioIndex].src;
  setCurrentTrack(playList[audioIndex]);
  audio.play();
  if (!audioFlag) {
    audioFlag = true;
    toggleBtn();
  }
  showMarkers();
}

function playPrev() {
  audioIndex--;
  if (audioIndex < 0) {
    audioIndex = 3;
  }
  setCurrentTrack(playList[audioIndex]);
  audio.play();
  if (!audioFlag) {
    audioFlag = true;
    toggleBtn();
  }
  showMarkers();
}

function toggleBtn() {
  button.classList.toggle('pause');

}

function showPlayList() {
  let i = 0;
  playList.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.id = 'item' + i;
    li.textContent = lang ? item.title : item.titleRu;
    document.querySelector('.play-list').append(li);
    i++;
  });
  setCurrentTrack(playList[0]);
  var temp = function (i) {
    if (i == audioIndex) {
      playAudio();
    } else {
      playNext(i);
    }
  }
  document.getElementById("item0").addEventListener('click', temp.bind(event, 0));
  document.getElementById("item1").addEventListener('click', temp.bind(event, 1));
  document.getElementById("item2").addEventListener('click', temp.bind(event, 2));
  document.getElementById("item3").addEventListener('click', temp.bind(event, 3));

}

function setCurrentTrack(track) {
  currentDuration.textContent = '00:00';
  fullDuration.textContent = track.duration;
  trackName.textContent = lang ? track.title : track.titleRu;
  audio.src = track.src;
}

function convertTime(time) {
  let mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  let secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  return mins + ':' + secs;
}

function changeProgressBar() {
  let displayProgress = document.getElementById('bar-sub');
  displayProgress.style.width = `${progressBar.value}%`;
  currentDuration.textContent = convertTime(audio.currentTime);
}

function audioProgress() {
  if (!isNaN(audio.duration)) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
  changeProgressBar();
}

function audioChangeTime() {
  audio.currentTime = (audio.duration * progressBar.value) / 100;

}

function changeVolumeBar() {
  document.getElementById('volume-sub').style.width = `${volume.value}%`;
}

function changeVolume() {
  audio.volume = volume.value / 100;
  if (audio.volume == 0) {
    document.querySelector('.volume-icon').style.backgroundImage = 'url("assets/svg/mute.svg")';
  } else {
    document.querySelector('.volume-icon').style.backgroundImage = 'url("assets/svg/volume.svg")';
  }
  changeVolumeBar();
}

function mute() {
  if (audio.volume == 0) {
    volume.value = tempVolume;
  } else {
    tempVolume = volume.value;
    volume.value = 0;
  }
  changeVolume();
}

function showSettings() {
  settingsMenu.style.transform = 'translateY(-400px)';
  settingsIcon.style.opacity = '0';
}

function hideSettings() {
  settingsMenu.style.transform = 'translateY(400px)';
  settingsIcon.style.opacity = '1';
}

function changeLang() {
  let langForm = new FormData(document.querySelector('.set-lang'));
  language = langForm.get('language');
  localStorage.setItem('language', language);
}

function showCurrentLang() {
  if (lang) {
    document.getElementById('en').setAttribute('checked', 'checked');
    document.getElementById('ru').removeAttribute('checked', 'checked');
  } else {
    document.getElementById('en').removeAttribute('checked', 'checked');
    document.getElementById('ru').setAttribute('checked', 'checked');
  }
}

function changeSource() {
  let sourceForm = new FormData(document.querySelector('.set-source'));
  source = sourceForm.get('source');
  localStorage.setItem('source', source);
}

function showCurrentSource() {
  console.log(source);
  document.getElementById('gh').removeAttribute('checked', 'checked');
  document.getElementById('unsplash').removeAttribute('checked', 'checked');
  document.getElementById('flickr').removeAttribute('checked', 'checked');
  if (source == 'github') {
    document.getElementById('gh').setAttribute('checked', 'checked');
  }
  if (source == 'unsplash') {
    document.getElementById('unsplash').setAttribute('checked', 'checked');
  }
  if (source == 'flickr') {
    document.getElementById('flickr').setAttribute('checked', 'checked');
  }
}

function changeWidgets() {
  let sourceForm = new FormData(document.querySelector('.set-source'));
}

function tranlateSettings() {
  document.querySelector('.title-text').textContent = lang ? 'Settings' : 'Настройки';
  document.querySelector('.settings-subtitle.language').textContent = lang ? 'Language:' : 'Язык:';
  document.querySelector('.settings-subtitle.source').textContent = lang ? 'Image source:' : 'Источник изображений:';
  document.querySelector('.english-language').textContent = lang ? 'English' : 'Английский';
  document.querySelector('.russian-language').textContent = lang ? 'Russian' : 'Русский';
  document.querySelector('.settings-subtitle.widgets').textContent = lang ? 'Display widgets:' : 'Отображать виджеты:';
  document.querySelector('.time-widget').textContent = lang ? 'Time' : 'Время';
  document.querySelector('.date-widget').textContent = lang ? 'Date' : 'Дата';
  document.querySelector('.greeting-widget').textContent = lang ? 'Greeting' : 'Приветствие';
  document.querySelector('.quotes-widget').textContent = lang ? 'Quotes' : 'Цитаты';
  document.querySelector('.weather-widget').textContent = lang ? 'Weather' : 'Погода';
  document.querySelector('.player-widget').textContent = lang ? 'Player' : 'Плеер';
  document.querySelector('.todo-widget').textContent = lang ? 'Todo List' : 'Список дел';



}

tranlateSettings();

function initAll() {
  showTime();
  showGreeting();
  showCurrentLang();
  showCurrentSource();
  setBgGH();
  getWeather('Minsk');
  getQuotes();
  showPlayList();
}

cityInput.addEventListener('change', function () {
  city = cityInput.value;
  localStorage.setItem('city', city);
  getWeather();
});

window.addEventListener('load', function () {
  username = localStorage.getItem('username') || '';
  city = localStorage.getItem('city') || 'Minsk';
  initAll();
});

nameInput.addEventListener('change', function () {
  localStorage.setItem('username', nameInput.value);
});

document.querySelector('.slide-next').addEventListener('click', nextImage);
document.querySelector('.slide-prev').addEventListener('click', prevImage);
document.querySelector('.change-quote').addEventListener('click', getQuotes);
document.querySelector('.play-next').addEventListener('click', playNext);
document.querySelector('.play-prev').addEventListener('click', playPrev);
document.querySelector('.play').addEventListener('click', playAudio);
audio.addEventListener('timeupdate', audioProgress);
audio.addEventListener('ended', playNext);
progressBar.addEventListener('input', audioChangeTime);
volume.addEventListener('input', changeVolume);
document.querySelector('.volume-icon').addEventListener('click', mute);
settingsIcon.addEventListener('click', showSettings);
settingsClose.addEventListener('click', hideSettings);
document.querySelector('.set-lang').addEventListener('input', changeLang);
document.querySelector('.set-source').addEventListener('input', changeSource);



