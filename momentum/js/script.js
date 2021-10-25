import playList from '../js/playList.js';

let username;
let timeOfDay;
let picIndex;
let city;
let linkIndex;
let imgFlag = true;
let audioFlag = false;
let audioIndex = 0;
let tempVolume = 0;
let addFlag = false;

let lang;
let language = localStorage.getItem('language') || 'en';
if (language == 'en') {
  lang = true;
} else {
  lang = false;
}
let source = localStorage.getItem('source') || 'github';
let imageTag = 'nature';

const body = document.querySelector('body');
const time = document.querySelector('time');
const date = document.querySelector('date');
const greeting = document.querySelector('.greeting');
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
const settingsMenu = document.querySelector('.settings');
const settingsIcon = document.querySelector('.settings-icon');
const settingsClose = document.querySelector('.settings-close');
const linksIcon = document.querySelector('.links-icon');

const progressBar = document.getElementById('progress-bar');
const volume = document.getElementById('volume-bar');
const timeWidget = document.getElementById('time');
const dateWidget = document.getElementById('date');
const greetingWidget = document.getElementById('greeting');
const quotesWidget = document.getElementById('quotes');
const weatherWidget = document.getElementById('weather');
const playerWidget = document.getElementById('player');
const linksWidget = document.getElementById('links-visibility');
localStorage.setItem('links', '');
localStorage.setItem('linkIndex', '');

String.prototype.formatCity = function () {
  let word = [];
  this.split(' ').forEach((item, index) => {
    word[index] = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  });
  return word.join(' ');
};

const withHttp = (url) => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `http://${nonSchemmaUrl}`);

function showTime() {
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 500);
}

function showDate() {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const region = (lang) ? 'en-US' : 'ru-RU';
  const currentDate = today.toLocaleDateString(region, options).formatCity();
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
    body.style.backgroundImage = `url(${img.src})`;
  };
  setTimeout(function () { imgFlag = true }, 1000);
}

async function setBgUnsplash() {
  try {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${imageTag}&client_id=dtkO_hag5StGhJA-3odxAVROrP3c94nDFKGbf8HCMtA`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  } catch (e) {
    console.log('tag is inavlid');
  }
}

async function setBgFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0291ac2d30b9f9bc48589b0c2fb70b32&tags=${imageTag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  try {
    let index = getRandomNum(1, 90);
    img.src = await data.photos.photo[index].url_l;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  } catch (e) {
    console.log('tag is inavlid');
  }
}

function setBg() {
  if (source == 'github') {
    document.querySelectorAll('.slider-icon').forEach(item => {
      item.style.opacity = 1;
      item.style.pointerEvents = 'auto';
    });
    document.querySelector('.tag').style.opacity = '0';
    document.querySelector('.tag').style.marginBottom = '-30px';
    setBgGH();
  }

  if (source == 'unsplash') {
    document.querySelectorAll('.slider-icon').forEach(item => {
      item.style.opacity = 0;
      item.style.pointerEvents = 'none';
    });
    document.querySelector('.tag').style.opacity = '1';
    document.querySelector('.tag').style.marginBottom = '-10px';
    setBgUnsplash();
  }

  if (source == 'flickr') {
    document.querySelectorAll('.slider-icon').forEach(item => {
      item.style.opacity = 1;
      item.style.pointerEvents = 'auto';
    });
    document.querySelector('.tag').style.opacity = '1';
    document.querySelector('.tag').style.marginBottom = '-10px';
    setBgFlickr();
  }
}

function nextImage() {
  if (source == 'github') {
    if (imgFlag) {
      (picIndex != 20) ? picIndex++ : picIndex = 1;
      setBgGH();
    }
  }
  if (source == 'flickr') {
    setBgFlickr();
  }
}

function prevImage() {
  if (source == 'github') {
    if (imgFlag) {
      (picIndex != 1) ? picIndex-- : picIndex = 20;
      setBgGH();
    }
  }
  if (source == 'flickr') {
    setBgFlickr();
  }
}

function getTag() {
  imageTag = document.getElementById('tag').value;
  setBg();
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
  document.querySelectorAll('.play-item').forEach(item => {
    item.remove();
  });
  playList.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.id = 'item' + i;
    li.textContent = lang ? item.title : item.titleRu;
    document.querySelector('.play-list').append(li);
    i++;
  });
  if (audioFlag) {
    audioFlag = false;
    toggleBtn();
  }
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

function showLinks() {
  document.querySelector('.links').style.transform = 'translateY(0)';
  document.querySelector('.links-icon').style.opacity = '0';
}

function hideLinks() {
  document.querySelector('.links').style.transform = 'translateY(100%)';
  document.querySelector('.links-icon').style.opacity = '1';
}

function showSettings() {
  settingsMenu.style.transform = 'translateY(0)';
  settingsIcon.style.opacity = '0';
}

function hideSettings() {
  settingsMenu.style.transform = 'translateY(100%)';
  settingsIcon.style.opacity = '1';
}

function changeLang() {
  let langForm = new FormData(document.querySelector('.set-lang'));
  language = langForm.get('language');
  lang = (language == 'en') ? true : false;
  localStorage.setItem('language', language);
  initAll();
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
  setBg();
}

function showCurrentSource() {
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

function showCurrentTag() {
  document.querySelector('.picture-tag').value = imageTag;
}

function hideTime() {
  let widgetsForm = new FormData(document.querySelector('.set-widgets'));
  if (widgetsForm.get('time')) {
    localStorage.setItem('time', true);
    time.style.opacity = 1;
  } else {
    timeWidget.removeAttribute('checked');
    time.style.opacity = 0;
    localStorage.setItem('time', false);
  }
}

function hideDate() {
  let widgetsForm = new FormData(document.querySelector('.set-widgets'));
  if (widgetsForm.get('date')) {
    localStorage.setItem('date', true);
    date.style.opacity = 1;
  } else {
    localStorage.setItem('date', false);
    date.style.opacity = 0;
  }
}

function hideGreeting() {
  let widgetsForm = new FormData(document.querySelector('.set-widgets'));
  if (widgetsForm.get('greeting')) {
    localStorage.setItem('greeting', true);
    greeting.style.opacity = 1;
    nameInput.style.opacity = 1;
  } else {
    localStorage.setItem('greeting', false);
    greeting.style.opacity = 0;
    nameInput.style.opacity = 0;
  }
}

function hideQuotes() {
  let widgetsForm = new FormData(document.querySelector('.set-widgets'));
  let quotes = document.querySelector('.quotes');
  let button = document.querySelector('.change-quote');
  if (widgetsForm.get('quotes')) {
    localStorage.setItem('quotes', true);
    quotes.style.opacity = 1;
    button.style.opacity = 1;
  } else {
    localStorage.setItem('quotes', false);
    quotes.style.opacity = 0;
    button.style.opacity = 0;
  }
}

function hideWeather() {
  let widgetsForm = new FormData(document.querySelector('.set-widgets'));
  let weather = document.querySelector('.weather');
  if (widgetsForm.get('weather')) {
    localStorage.setItem('weather', true);
    weather.style.opacity = 1;
  } else {
    localStorage.setItem('weather', false);
    weather.style.opacity = 0;
  }
}

function hidePlayer() {
  let widgetsForm = new FormData(document.querySelector('.set-widgets'));
  let player = document.querySelector('.player');
  if (widgetsForm.get('player')) {
    localStorage.setItem('player', true);
    player.style.opacity = 1;
    player.style.pointerEvents = 'auto';
  } else {
    localStorage.setItem('player', false);
    player.style.opacity = 0;
    player.style.pointerEvents = 'none';
  }
}

function hideLinksIcon() {
  let widgetsForm = new FormData(document.querySelector('.set-widgets'));
  if (widgetsForm.get('links-visibility')) {
    localStorage.setItem('links-visibility', true);
    linksIcon.style.opacity = 1;
    linksIcon.style.pointerEvents = "auto";
  } else {
    localStorage.setItem('links-visibility', false);
    linksIcon.style.opacity = 0;
    linksIcon.style.pointerEvents = "none";
  }
}

function showCurrentWidgets() {
  if (JSON.parse(localStorage.getItem('time')) == false) {
    timeWidget.removeAttribute('checked');
    hideTime();
  }
  if (JSON.parse(localStorage.getItem('date')) == false) {
    dateWidget.removeAttribute('checked');
    hideDate();
  }
  if (JSON.parse(localStorage.getItem('greeting')) == false) {
    greetingWidget.removeAttribute('checked');
    hideGreeting();
  }
  if (JSON.parse(localStorage.getItem('quotes')) == false) {
    quotesWidget.removeAttribute('checked');
    hideQuotes();
  }
  if (JSON.parse(localStorage.getItem('weather')) == false) {
    weatherWidget.removeAttribute('checked');
    hideWeather();
  }
  if (JSON.parse(localStorage.getItem('player')) == false) {
    playerWidget.removeAttribute('checked');
    hidePlayer();
  }
  if (JSON.parse(localStorage.getItem('links-visibility')) == false) {
    linksWidget.removeAttribute('checked');
    hideLinksIcon();
  }
}

function showAddWindow() {
  if (!addFlag) {
    document.querySelector('.add-link').style.backgroundImage = 'url(assets/svg/back.svg)'
    document.querySelector('.link-inner').style.marginLeft = '-250px';
    addFlag = true;
  } else {
    document.querySelector('.add-link').style.backgroundImage = 'url(assets/svg/add.svg)'
    document.querySelector('.link-inner').style.marginLeft = '0';
    addFlag = false;
  }
}

function createLink(name, link) {

  linkIndex = localStorage.getItem('linkIndex') || 0;

  if (typeof name == 'object') {
    name = document.getElementById('link-name').value;
  }
  if (typeof link == 'undefined') {
    link = document.getElementById('link-link').value;
  }
  if (!name || !link) {
    return;
  }

  document.getElementById('link-name').value = '';
  document.getElementById('link-link').value = '';

  const linkWrap = document.createElement('div');
  linkWrap.classList.add('link-wrap');

  const deleteBtn = document.createElement('img');
  deleteBtn.classList.add('link-more');
  deleteBtn.setAttribute('src', 'assets/svg/settings/close.svg');
  deleteBtn.id = linkIndex;
  deleteBtn.addEventListener('click', deleteLink);

  const a = document.createElement('a');
  a.classList.add('custom-link');
  a.setAttribute('href', withHttp(link));
  a.setAttribute('target', '_blank');

  const nameSpan = document.createElement('span');
  nameSpan.classList.add('link-name');
  nameSpan.textContent = name;

  const img = document.createElement('img');
  img.setAttribute('src', 'assets/svg/webpage.svg');

  a.append(img);
  a.append(nameSpan);

  linkWrap.append(a);
  linkWrap.append(deleteBtn);
  linkWrap.id = `link${linkIndex}`;

  document.querySelector('.link-list').append(linkWrap);

  let links = JSON.parse(localStorage.getItem("links") || "[]");

  let newLink = {
    name: name,
    link: link,
    id: linkWrap.id
  }

  if (arrayObjectIndexOf(links, newLink.id) == -1) {
    links.push(newLink);
  }
  linkIndex++;
  localStorage.setItem('links', JSON.stringify(links));
  localStorage.setItem('linkIndex', linkIndex);

  if (addFlag) {
    showAddWindow();
  }
}

function getSavedLinks() {
  let links = JSON.parse(localStorage.getItem("links") || "[]");
  localStorage.setItem('linkIndex', 0);
  for (let i = 0; i < links.length; i++) {
    if (links[i]) {
      createLink(links[i].name, links[i].link);
    }
  }
}

function deleteLink(e) {
  let links = JSON.parse(localStorage.getItem("links") || "[]");
  let id = `link${e.currentTarget.id}`;
  let deleteIndex = arrayObjectIndexOf(links, id);
  links.splice(deleteIndex, 1, null);
  localStorage.setItem('links', JSON.stringify(links));
  document.getElementById(`link${e.currentTarget.id}`).remove();
}

function arrayObjectIndexOf(arr, searchTerm) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i]) {
      if (arr[i].id == searchTerm) return i;
    }
  }
  return -1;
}

function translateSettings() {
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
  document.querySelector('.links-widget').textContent = lang ? 'Links' : 'Ссылки';
  document.querySelector('.tag-label').textContent = lang ? 'Tag:' : 'Тэг:';
  document.querySelector('.change-tag').textContent = lang ? 'Change' : 'Изменить';
  document.querySelector('.links-text').textContent = lang ? 'Links:' : 'Ссылки:';
  document.querySelector('.label-name').textContent = lang ? 'Name:' : 'Название:';
  document.querySelector('.label-link').textContent = lang ? 'Link:' : 'Ссылка:';
  document.querySelector('.add-button').textContent = lang ? 'Add' : 'Добавить';
}

function initAll() {
  showCurrentWidgets();
  showTime();
  showGreeting();
  showCurrentLang();
  showCurrentSource();
  setBg();
  showPlayList();
  getWeather('Minsk');
  getQuotes();
  translateSettings();
  showCurrentTag();
  getSavedLinks();
}

timeWidget.addEventListener('click', hideTime);
dateWidget.addEventListener('click', hideDate);
greetingWidget.addEventListener('click', hideGreeting);
quotesWidget.addEventListener('click', hideQuotes);
weatherWidget.addEventListener('click', hideWeather);
playerWidget.addEventListener('click', hidePlayer);
linksWidget.addEventListener('click', hideLinksIcon);
settingsIcon.addEventListener('click', showSettings);
settingsClose.addEventListener('click', hideSettings);
progressBar.addEventListener('input', audioChangeTime);
volume.addEventListener('input', changeVolume);
audio.addEventListener('timeupdate', audioProgress);
audio.addEventListener('ended', playNext);

document.querySelector('.slide-next').addEventListener('click', nextImage);
document.querySelector('.slide-prev').addEventListener('click', prevImage);
document.querySelector('.change-quote').addEventListener('click', getQuotes);
document.querySelector('.play-next').addEventListener('click', playNext);
document.querySelector('.play-prev').addEventListener('click', playPrev);
document.querySelector('.play').addEventListener('click', playAudio);
document.querySelector('.volume-icon').addEventListener('click', mute);
document.querySelector('.links-icon').addEventListener('click', showLinks);
document.querySelector('.links-close').addEventListener('click', hideLinks);
document.querySelector('.add-link').addEventListener('click', showAddWindow);
document.querySelector('.add-button').addEventListener('click', createLink);
document.querySelector('.change-tag').addEventListener('click', getTag);
document.querySelector('.set-lang').addEventListener('input', changeLang);

document.querySelectorAll('.radio-wrapper').forEach(item => {
  item.addEventListener('input', changeSource);
});

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

document.getElementById('tag').addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});


console.log(`
                                                            
Все пункты задания выполнены.
Самооценка 160/150

В качестве дополнительного функциоанала сделан список ссылок (кнопка в нижнем левом углу).
По умолчанию сохранены две ссылки - RSS и мой гитхаб.
При нажатии кнопки "+" открывается меню добавления новой ссылки. 
У ссылки есть название и непосредственно адрес страницы, которая открывается при клике на ссылку.
При нажатии на символ "х" около ссылки она удаляется. 
Добавлять можно бесконечное количество ссылок, виджет имеет адаптивную высоту.

Из особенностей основного приложения: 
  -Я целенаправленно отключил стрелки переключения бэкграунда при выборе Unsplash в качестве источника. Сделано это с целью уменьшения нагрузки на их API (т.к. установлен лимит 50 реквестов в час).

  -В настройках можно указать тэг для поиска изображений в Flickr и Unsplash.
Если тег не валиден - источник изображения не изменится(сохранится предыдущий). После перезагрузки тег изменяется на дефолтный(nature), чтобы избежать зависания страницы на несуществующем теге.

  -Картинки с Flickr подгружаются достаточно медленно, нужно подождать 3-7 секунд для обновления изображения. При обновлении страницы с Flickr в качестве источника первое время висит белый экран. Картинки по тегам тоже приходят не всегда идеальные, такой вот сервис :)

`);