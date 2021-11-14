const volume = document.getElementById('volume-bar');
const timeBar = document.getElementById('time-bar');

const settingsBtn = document.getElementById('settings-btn');
const saveBtn = document.getElementById('save-btn');

const artistsBtn = document.getElementById('artists-mode');
const picturesBtn = document.getElementById('pictures-mode');

const homeBtn = document.getElementById('home-btn');
const scoreBtn = document.getElementById('score-btn');

const answerIndicators = document.querySelectorAll('.question-bullet');

const artistsPage = document.querySelector('.categories-page.artists');

let timeMode;
let timeLimit;

let questionNumber;
let cardNumber;
let correctAnswer;
let images;

// TODO change to real audio
const audio = {};
let tempVolume;

function getRandomNum(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  let temp;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function toggleElem(selector) {
  document.querySelectorAll(selector).forEach(item => {
    item.classList.toggle('hide');
  });
}

function toggleBlock(elem) {
  elem.currentTarget.path.forEach(item => {
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

function saveSettings(elem) {
  localStorage.setItem('timeLimit', timeLimit);
  localStorage.setItem('timeMode', timeMode);
  localStorage.setItem('volume', volume.value);
  toggleBlock(elem);
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
    item.querySelector('.category-number').innerHTML = (index >= 120) ? ((index - 120) / 10 + 1) : (index / 10 + 1);
    item.querySelector('.category-img').style.backgroundImage = `url("assets/img/image-data/img/${index}.jpg")`;
    index += 10;
  });
}

function initGame(card) {
  cardNumber = card;
  questionNumber = (card - 1) * 10;
  images = getImageData();
  images.then((res) => {
    images = res;
    showQuestion(questionNumber);
  });
}

async function getImageData() {
  try {
    const url = 'https://raw.githubusercontent.com/saratovkin/art-quiz-json/main/images.json'
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('an error has occurred');
  }
}

function showQuestion(qNum) {
  // longest is Николай Богданов-Бельский
  document.querySelectorAll('.answer').forEach(item => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  document.querySelector('.artists-mode').classList.remove('blocked');
  document.querySelector('.page-name').innerHTML = 'Кто автор данной картины?';
  let currentQuestion = images[qNum];
  document.querySelector('.image-question').style.backgroundImage = `url("assets/img/image-data/img/${currentQuestion.imageNum}.jpg")`;
  correctAnswer = currentQuestion.author;
  let randomAnswer;
  let answers = [];
  answers.push(correctAnswer);
  while (answers.length != 4) {
    randomAnswer = images[getRandomNum(0, 240)].author;
    if (!answers.includes(randomAnswer)) {
      answers.push(randomAnswer);
    }
  }
  shuffle(answers);
  document.querySelectorAll('.answer').forEach(item => {
    let temp = answers.pop();
    item.innerHTML = temp;
  });
}

function getAnswer(elem) {
  checkAnswer(elem.target);
}

function checkAnswer(answer) {
  if (answer.innerHTML == correctAnswer) {
    answer.classList.add('correct');
    answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('correct');
  } else {
    answer.classList.add('wrong');
    answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('wrong');
  }
  document.querySelector('.artists-mode').classList.add('blocked');
  questionNumber++;
  console.log(questionNumber);
  console.log((cardNumber * 10 - 1));
  if ((cardNumber * 10 - 1) >= questionNumber) {
    setTimeout(() => showQuestion(questionNumber), 500);
  } else {
    console.log('round is over');
  }
}

settingsBtn.path = ['.settings-field', '.select-type', '.button-container', '.main'];
settingsBtn.addEventListener('click', toggleBlock);

saveBtn.path = settingsBtn.path;
saveBtn.addEventListener('click', saveSettings);

artistsBtn.path = ['.main-container', '.settings-btn.main', '.categories-page.artists', '.pagination'];
artistsBtn.addEventListener('click', toggleBlock);

picturesBtn.path = ['.main-container', '.settings-btn.main', '.categories-page.pictures', '.pagination'];
picturesBtn.addEventListener('click', toggleBlock);

homeBtn.path = ['.main-container', '.settings-btn.main', '.categories-page.artists', '.pagination'];
homeBtn.addEventListener('click', toggleBlock);

artistsPage.path = ['.categories-page.artists', '.artists-mode', '.icon'];
artistsPage.addEventListener('click', (elem) => {
  toggleBlock(elem);
  initGame(elem.target.querySelector('.category-number').innerHTML);
});

volume.addEventListener('input', setVolume);
timeBar.addEventListener('input', setTimeInterval);
saveBtn.addEventListener('click', saveSettings);

document.querySelector('.mute-icon').addEventListener('click', mute);
document.getElementById('time-mode').addEventListener('click', toggleTimeMode);
document.getElementById('default-btn').addEventListener('click', setDefault);
document.querySelector('.answers').addEventListener('click', getAnswer);

window.addEventListener('load', function () {
  timeLimit = +localStorage.getItem('timeLimit') || 25;
  timeBar.value = timeLimit / 5 - 1;
  timeMode = JSON.parse(localStorage.getItem('timeMode'));
  audio.volume = localStorage.getItem('volume') || 80;
  volume.value = audio.volume;
  displayPreviews();
  initSettings();
});
