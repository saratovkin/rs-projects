const volume = document.getElementById('volume-bar');
const timeBar = document.getElementById('time-bar');

const settingsBtn = document.getElementById('settings-btn');
const saveBtn = document.getElementById('save-btn');

const artistsBtn = document.getElementById('artists-mode');
const picturesBtn = document.getElementById('pictures-mode');

let timeMode;
let timeLimit;

// TODO change to real audio
const audio = {};
let tempVolume;

function toggleElem(selector) {
  document.querySelectorAll(selector).forEach(item => {
    item.classList.toggle('hide');
  });
}

function toggleBlock(e) {
  e.currentTarget.path.forEach(item => {
    toggleElem(item);
  });
}

function displayVolume() {
  document.getElementById('volume-sub').style.width = `${volume.value}%`;
}

function setVolume() {
  audio.volume = volume.value / 100;
  if (audio.volume == 0) {
    document.querySelector('.mute-icon').style.backgroundImage = 'url("assets/svg/settings/mute.svg")';
  } else {
    document.querySelector('.mute-icon').style.backgroundImage = 'url("assets/svg/settings/unmute.svg")';
  }
  displayVolume();
}

function mute() {
  if (audio.volume == 0) {
    volume.value = tempVolume;
  } else {
    tempVolume = volume.value;
    volume.value = 0;
  }
  setVolume();
}


// TODO fix checkbox bug
function showTimeMode() {
  if (timeMode == true) {
    document.getElementById('time').checked = true;
    document.querySelector('.time-range').classList.remove('blocked');
  }
  if (timeMode == false) {
    document.getElementById('time').checked = false;
    document.querySelector('.time-range').classList.add('blocked');
  }
}

function toggleTimeMode() {
  timeMode = !timeMode;
  showTimeMode();
}

function displayTimeInterval() {
  document.getElementById('time-sub').style.width = `${timeBar.value * 20}%`;
  document.getElementById('time-selected').innerHTML = timeLimit;
}

function setTimeInterval() {
  timeLimit = (+timeBar.value + 1) * 5;
  displayTimeInterval();
}

function saveSettings(e) {
  localStorage.setItem('timeLimit', timeLimit);
  localStorage.setItem('timeMode', timeMode);
  localStorage.setItem('volume', volume.value);
  toggleBlock(e);
}

function setDefault() {
  timeBar.value = 3;
  timeMode = false;
  initSettings();
}

function initSettings() {
  setTimeInterval();
  setVolume();
  showTimeMode();
}

function displayPreviews() {
  let index = 0;
  document.querySelectorAll('.category').forEach(item => {
    item.querySelector('.category-number').innerHTML = index / 10 + 1;
    item.querySelector('.category-img').style.backgroundImage = `url("assets/img/image-data/img/${index}.jpg")`;
    index += 10;
  });
}
settingsBtn.path = ['.settings-field', '.select-type', '.button-container', '.main'];
settingsBtn.addEventListener('click', toggleBlock);

saveBtn.path = settingsBtn.path;
saveBtn.addEventListener('click', saveSettings);

artistsBtn.path = ['.main-container', '.settings-btn.main', '.categories-page.artists'];
artistsBtn.addEventListener('click', toggleBlock);


picturesBtn.path = ['.main-container', '.settings-btn.main', '.categories-page.pictures'];
picturesBtn.addEventListener('click', toggleBlock);

volume.addEventListener('input', setVolume);
timeBar.addEventListener('input', setTimeInterval);
document.querySelector('.mute-icon').addEventListener('click', mute);
document.getElementById('time-mode').addEventListener('click', toggleTimeMode);
document.getElementById('save-btn').addEventListener('click', saveSettings);
document.getElementById('default-btn').addEventListener('click', setDefault);

window.addEventListener('load', function () {
  timeLimit = +localStorage.getItem('timeLimit') || 25;
  timeBar.value = timeLimit / 5 - 1;
  timeMode = JSON.parse(localStorage.getItem('timeMode'));
  audio.volume = localStorage.getItem('volume') || 80;
  volume.value = audio.volume;
  displayPreviews();
  initSettings();
});
