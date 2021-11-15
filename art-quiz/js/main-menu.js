const volumeBar = document.getElementById('volume-bar');
const timeBar = document.getElementById('time-bar');

const settingsBtn = document.getElementById('settings-btn');
const saveBtn = document.getElementById('save-btn');

const artistsBtn = document.getElementById('artists-mode');
const picturesBtn = document.getElementById('pictures-mode');

const homeBtn = document.getElementById('home-btn');
const scoreBtn = document.getElementById('score-btn');


const homeBtnPopup = document.getElementById('home-btn-popup');
const scoreBtnPopup = document.getElementById('score-btn-popup');

const answerIndicators = document.querySelectorAll('.question-bullet');

const artistsPage = document.querySelector('.categories-page.artists');

const popupIcon = document.querySelector('.popup-icon');
const popupBtn = document.querySelector('.popup-btn');

const timerInfo = document.querySelector('.pagination-timer');

let timeMode;
let timeLimit;

let questeionInterval;
let questionTimeOut;

let questionNumber;
let cardNumber;
let correctAnswer;
let images;

let answersCounter;

let volume;
let tempVolume;
let soundEffect;

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

function toggleBlock(elem) {
  elem.currentTarget.show.forEach(item => {
    document.querySelectorAll(item).forEach(obj => {
      obj.classList.remove('hide');
    });
  });
  elem.currentTarget.hide.forEach(item => {
    document.querySelectorAll(item).forEach(obj => {
      obj.classList.add('hide');
    });
  });
}

function displayVolume() {
  document.getElementById('volume-sub').style.width = `${volumeBar.value}%`;
}

function setVolume() {
  volume = volumeBar.value / 100;
  if (volume == 0) {
    document.querySelector('.mute-icon').style.backgroundImage = 'url("assets/svg/settings/mute.svg")';
  } else {
    document.querySelector('.mute-icon').style.backgroundImage = 'url("assets/svg/settings/unmute.svg")';
  }
  displayVolume();
}

function mute() {
  if (volume == 0) {
    volumeBar.value = tempVolume;
  } else {
    tempVolume = volume.value;
    volumeBar.value = 0;
  }
  setVolume();
}

function showTimeMode() {
  if (timeMode == true) {
    document.querySelector('.time-range').classList.remove('blocked');
  } else {
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
  localStorage.setItem('volume', volumeBar.value / 10);
  toggleBlock(elem);
}

function setDefault() {
  timeBar.value = 3;
  timeMode = false;
  volume = 0.8;
  volumeBar.value = 80;
  initSettings();
}

function initSettings() {
  if (timeMode) {
    document.getElementById('time-checkbox').setAttribute('checked', 'checked');
  } else {
    document.getElementById('time-checkbox').removeAttribute('checked');

  }

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
  answersCounter = 0;
  questionNumber = (card - 1) * 10;
  images = getImageData();
  answerIndicators.forEach(item => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  document.querySelector('.page-name').innerHTML = '';
  document.querySelector('.popup-next').classList.remove('hide');
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
  showQuestionInfo(currentQuestion);
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
  if (timeMode) {
    let tempTime = timeLimit;
    timerInfo.innerHTML = '00:' + (tempTime + '').padStart(2, '0');
    questeionInterval = setInterval(() => {
      tempTime--;
      if (tempTime == 3) {
        playAudio("assets/sound-effects/timer.mp3");
        timerInfo.classList.add('last-seconds');
      }
      timerInfo.innerHTML = '00:' + (tempTime + '').padStart(2, '0');
    }, 1000);
    questionTimeOut = setTimeout(() => checkAnswer(), timeLimit * 1000);
  }
}

function showQuestionInfo(current) {
  document.querySelector('.image-question').style.backgroundImage = `url("assets/img/image-data/img/${current.imageNum}.jpg")`;
  document.querySelector('.popup-image').style.backgroundImage = `url("assets/img/image-data/img/${current.imageNum}.jpg")`;
  document.querySelector('.popup-info').innerHTML = `${current.name} <br>${current.author}<br>${current.year}`;
}

function getAnswer(elem) {
  checkAnswer(elem.target);
}

function checkAnswer(answer) {
  clearInterval(questeionInterval);
  clearTimeout(questionTimeOut);
  timerInfo.classList.remove('last-seconds');
  if (answer) {
    if (answer.innerHTML == correctAnswer) {
      answersCounter++;
      answer.classList.add('correct');
      answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('correct');
      popupIcon.classList.remove('wrong');
      playAudio("assets/sound-effects/right.mp3");

    } else {
      answer.classList.add('wrong');
      answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('wrong');
      popupIcon.classList.add('wrong');
      playAudio("assets/sound-effects/wrong.mp3");
    }
  } else {
    answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('wrong');
    popupIcon.classList.add('wrong');
  }
  document.querySelector('.artists-mode').classList.add('blocked');
  document.querySelector('.answer-popup').classList.remove('hide');
}

function nextQuestion() {
  questionNumber++;
  document.querySelector('.answer-popup').classList.add('hide');
  if ((cardNumber * 10 - 1) >= questionNumber) {
    showQuestion(questionNumber);
  } else {
    let results = JSON.parse(localStorage.getItem('attempted')) || [];
    results[cardNumber - 1] = answersCounter;
    localStorage.setItem('attempted', JSON.stringify(results));
    showRoundResult();
    displayAttemptedCategory();
  }
}

function showRoundResult() {
  let finalPopup = document.querySelector('.popup-final');
  document.querySelector('.artists-mode').classList.add('blocked');
  document.querySelector('.answer-popup').classList.remove('hide');
  document.querySelector('.popup-next').classList.add('hide');
  finalPopup.querySelector('.final-score').innerHTML = `${answersCounter}/10`;
  getEmoji(finalPopup.querySelector('.final-icon'));
}

function getEmoji(elem) {
  elem.className = '';
  elem.classList.add('final-icon');
  let type;
  if (answersCounter < 2) {
    type = 'very-bad';
  }
  if (answersCounter >= 2 && answersCounter < 4) {
    type = 'bad';
  }
  if (answersCounter >= 4 && answersCounter < 6) {
    type = 'normal';
  }
  if (answersCounter >= 6 && answersCounter < 9) {
    type = 'good';
  }
  if (answersCounter >= 9) {
    type = 'very-good';
  }
  elem.classList.add(type);
}

function displayAttemptedCategory() {
  let attempted = JSON.parse(localStorage.getItem('attempted')) || [];
  let temp;
  attempted.forEach((item, index) => {
    if (item != null) {
      temp = document.querySelectorAll('.category')[index];
      temp.classList.add('attempted');
      temp.querySelector('.category-stats').innerHTML = `${item}/10`;
    }
  });
}

function endGame(elem){
  if(soundEffect){
    soundEffect.pause();
  }
  clearInterval(questeionInterval);
  clearTimeout(questionTimeOut);
  timerInfo.classList.remove('last-seconds');
  timerInfo.innerHTML = '';
  toggleBlock(elem);
}

function playAudio(url) {
  soundEffect = new Audio(url);
  soundEffect.volume = volume;
  console.log(soundEffect.volume);
  soundEffect.play();
}

settingsBtn.show = ['.settings-field', , '.button-container',];
settingsBtn.hide = ['.select-type', '.main'];
settingsBtn.addEventListener('click', toggleBlock);

saveBtn.show = settingsBtn.hide;
saveBtn.hide = settingsBtn.show;
saveBtn.addEventListener('click', saveSettings);

artistsBtn.show = ['.categories-page.artists', '.pagination'];
artistsBtn.hide = ['.main', '.main-container', '.settings-btn.main'];
artistsBtn.addEventListener('click', toggleBlock);

picturesBtn.show = ['.categories-page.pictures', '.pagination'];
picturesBtn.show = ['.main-container', '.settings-btn.main'];
picturesBtn.addEventListener('click', toggleBlock);

homeBtn.show = ['.main-container', '.select-type', '.main', '.icon'];
homeBtn.hide = ['.categories-page.artists', '.categories-page.pictures', '.pagination', '.artists-mode', '.answer-popup'];
homeBtn.addEventListener('click', endGame);

homeBtnPopup.show = homeBtn.show;
homeBtnPopup.hide = homeBtn.hide;
homeBtnPopup.addEventListener('click', toggleBlock);

artistsPage.show = ['.artists-mode'];
artistsPage.hide = ['.categories-page.artists', '.icon'];
artistsPage.addEventListener('click', (elem) => {
  toggleBlock(elem);
  initGame(elem.target.querySelector('.category-number').innerHTML);
});

volumeBar.addEventListener('input', setVolume);
timeBar.addEventListener('input', setTimeInterval);
saveBtn.addEventListener('click', saveSettings);
popupBtn.addEventListener('click', nextQuestion);

document.querySelector('.mute-icon').addEventListener('click', mute);
document.getElementById('time-mode').addEventListener('click', toggleTimeMode);
document.getElementById('default-btn').addEventListener('click', setDefault);
document.querySelector('.answers').addEventListener('click', getAnswer);

window.addEventListener('load', function () {
  timeLimit = +localStorage.getItem('timeLimit') || 25;
  timeBar.value = timeLimit / 5 - 1;
  timeMode = JSON.parse(localStorage.getItem('timeMode'));
  volume = +localStorage.getItem('volume') || 0.8;
  volumeBar.value = volume;
  displayPreviews();
  initSettings();
  displayAttemptedCategory();
});
