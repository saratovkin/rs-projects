const volumeBar = document.getElementById('volume-bar');
const timeBar = document.getElementById('time-bar');

const settingsBtn = document.getElementById('settings-btn');
const saveBtn = document.getElementById('save-btn');

const artistsBtn = document.getElementById('artists-mode');
const picturesBtn = document.getElementById('pictures-mode');

const homeBtn = document.getElementById('home-btn');
const backBtn = document.getElementById('back-btn');

const homeBtnPopup = document.getElementById('home-btn-popup');
const nextBtnPopup = document.getElementById('next-btn-popup');

const answerIndicators = document.querySelectorAll('.question-bullet');

const artistsPage = document.querySelector('.categories-page.artists');
const picturesPage = document.querySelector('.categories-page.pictures');

const popupIcon = document.querySelector('.popup-icon');
const popupBtn = document.querySelector('.popup-btn');

const timerInfo = document.querySelector('.pagination-timer');

let timeMode;
let timeLimit;

let timerInterval;
let questionTimeOut;

let questionNumber;
let cardNumber;
let correctAnswer;
let images;
let roundResults;

let answersCounter;

let volume;
let tempVolume;
let soundEffect;

let isAudioEnabled = true;

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

function changeVolume() {
  setVolume();
  if (isAudioEnabled) {
    isAudioEnabled = false;
    playAudio("assets/sound-effects/right.mp3");
    setTimeout(() => (isAudioEnabled = true), 600);
  }
}

function mute() {
  if (volume == 0) {
    volumeBar.value = tempVolume;
  } else {
    tempVolume = volume.value;
    volumeBar.value = 0;
  }
  changeVolume();
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

function getImageURL(index) {
  return `https://raw.githubusercontent.com/irinainina/image-data/master/img/${index}.jpg`;
}
function displayPreviews() {
  let index = 0;
  document.querySelectorAll('.category').forEach(item => {
    item.querySelector('.category-number').innerHTML = (index >= 120) ? ((index - 120) / 10 + 1) : (index / 10 + 1);
    const img = new Image();
    img.src = getImageURL(index);
    img.onload = () => {
      item.querySelector('.category-img').style.backgroundImage = `url(${img.src})`;
    };
    index += 10;
  });
}

function initGame(flag, card) {
  cardNumber = flag ? card : (+card + 12);
  answersCounter = 0;
  questionNumber = (cardNumber - 1) * 10;
  images = getImageData();
  roundResults = [];
  answerIndicators.forEach(item => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  document.querySelector('.page-name').innerHTML = '';
  document.querySelector('.popup-next').classList.remove('hide');
  images.then((res) => {
    images = res;
    flag ? showAristsQuestion(questionNumber) : showPicturesQuestion(questionNumber);
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

function showAristsQuestion(qNum) {
  // longest is Николай Богданов-Бельский
  document.querySelectorAll('.answer').forEach(item => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  document.querySelector('.artists-mode').classList.remove('blocked');
  document.querySelector('.page-name').innerHTML = 'Кто автор данной картины?';
  let currentQuestion = images[qNum];
  showQuestionInfo(true, currentQuestion);
  correctAnswer = currentQuestion;
  let randomAnswer;
  let answers = [];
  answers.push(correctAnswer.author);
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
    timerInterval = setInterval(() => {
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

function showPicturesQuestion(qNum) {
  document.querySelectorAll('.picture-answer').forEach(item => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  let currentQuestion = images[qNum];
  document.querySelector('.pictures-mode').classList.remove('blocked');
  document.querySelector('.page-name').innerHTML = `Какую картинку нарисовал ${currentQuestion.author}?`;
  showQuestionInfo(false, currentQuestion);
  correctAnswer = currentQuestion;
  let randomAnswer;
  let answers = [];
  let authors = []
  authors.push(correctAnswer.author);
  answers.push(currentQuestion);
  while (answers.length != 4) {
    randomAnswer = images[getRandomNum(0, 240)];
    if (!authors.includes(randomAnswer.author)) {
      authors.push(randomAnswer.author)
      answers.push(randomAnswer);
    }
  }
  shuffle(answers);
  document.querySelectorAll('.picture-answer').forEach(item => {
    let temp = answers.pop();
    const img = new Image();
    img.src = getImageURL(temp.imageNum);
    img.onload = () => {
      item.style.backgroundImage = `url(${img.src})`;
    };
    item.num = temp.imageNum;
  });
  if (timeMode) {
    let tempTime = timeLimit;
    timerInfo.innerHTML = '00:' + (tempTime + '').padStart(2, '0');
    timerInterval = setInterval(() => {
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

function showQuestionInfo(flag, current) {
  const img = new Image();
  img.src = getImageURL(current.imageNum);
  img.onload = () => {
    if (flag) {
      document.querySelector('.image-question').style.backgroundImage = `url(${img.src})`;

    };
    document.querySelector('.popup-image').style.backgroundImage = `url(${img.src})`;
  }
  document.querySelector('.popup-info').innerHTML = `${current.name} <br>${current.author}<br>${current.year}`;
}

function checkAnswer(elem) {
  if (soundEffect) {
    soundEffect.pause();
  }
  let answer;
  if (elem) {
    answer = elem.target;
  }
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  timerInfo.classList.remove('last-seconds');
  if ((answer && answer.innerHTML == correctAnswer.author) || (answer && answer.num == correctAnswer.imageNum)) {
    roundResults.push(true);
    answersCounter++;
    answer.classList.add('correct');
    if (cardNumber <= 12) {
      answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('correct');
    } else {
      answerIndicators[10 + questionNumber - (cardNumber - 1) * 10].classList.add('correct');
    }
    popupIcon.classList.remove('wrong');
    playAudio("assets/sound-effects/right.mp3");
  } else {
    roundResults.push(false);
    if (answer) {
      answer.classList.add('wrong')
    }
    if (cardNumber <= 12) {
      answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('wrong');
    } else {
      answerIndicators[10 + questionNumber - (cardNumber - 1) * 10].classList.add('wrong');

    }
    popupIcon.classList.add('wrong');
    playAudio("assets/sound-effects/wrong.mp3");
  }
  document.querySelector('.artists-mode').classList.add('blocked');
  document.querySelector('.pictures-mode').classList.add('blocked');
  document.querySelector('.answer-popup').classList.remove('hide');
}

function nextQuestion() {
  questionNumber++;
  document.querySelector('.answer-popup').classList.add('hide');
  if ((cardNumber * 10 - 1) >= questionNumber) {
    if (cardNumber <= 12) {
      showAristsQuestion(questionNumber);
    } else {
      showPicturesQuestion(questionNumber);
    }
  } else {
    let results = JSON.parse(localStorage.getItem('attempted')) || [];
    results[cardNumber - 1] = {
      answersCounter: answersCounter,
      roundResults: roundResults
    }
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
      temp.querySelector('.category-stats').innerHTML = `${item.answersCounter}/10`;
    }
  });
}

function endGame(elem) {
  if (soundEffect) {
    soundEffect.pause();
  }
  hidePictureInfo();
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  timerInfo.classList.remove('last-seconds');
  timerInfo.innerHTML = '';
  document.querySelector('.page-name').innerHTML = '';
  toggleBlock(elem);
}

function playAudio(url) {
  soundEffect = new Audio(url);
  soundEffect.volume = volume;
  soundEffect.play();
}

function displayScore(flag, elem) {
  // longest is Сальвадор Дали - пчела вызванная полетом граната над пробуждением за секунду перед сном
  let images = getImageData();
  images.then((res) => {
    let results = JSON.parse(localStorage.getItem('attempted')) || [];
    let cardIndex = elem.querySelector('.category-number').innerHTML;
    cardIndex = flag ? cardIndex : (+cardIndex + 12);
    let temp = (cardIndex - 1) * 10;
    let catName = elem.querySelector('.category-name').innerHTML;
    res = res.slice(temp, temp + 10);
    document.querySelectorAll('.score-card').forEach((item, questionIndex) => {
      item.number = cardIndex;
      const img = new Image();
      img.src = getImageURL(temp);
      img.onload = () => {
        item.querySelector('.score-image').style.backgroundImage = `url(${img.src})`;
      };
      item.querySelector('.score-title').innerHTML = catName;
      item.querySelector('.score-image-info').innerHTML = `${res[questionIndex].name} <br>${res[questionIndex].author}<br>${res[questionIndex].year}`;
      if (results[cardIndex - 1]) {
        if (results[cardIndex - 1].roundResults[questionIndex]) {
          item.querySelector('.score-image').classList.add('played');
        } else {
          item.querySelector('.score-image').classList.remove('played');
        }
      }
      temp++;
    });
  });
}

function showPictureInfo(elem) {
  elem.target.classList.toggle('clicked');
}

function hidePictureInfo() {
  document.querySelectorAll('.score-image').forEach(item => {
    item.classList.remove('clicked');
  });
}

settingsBtn.show = ['.settings-field', , '.button-container',];
settingsBtn.hide = ['.select-type', '.main'];
settingsBtn.addEventListener('click', toggleBlock);

saveBtn.show = settingsBtn.hide;
saveBtn.hide = settingsBtn.show;
saveBtn.addEventListener('click', saveSettings);

artistsBtn.show = ['.categories-page.artists', '.pagination'];
artistsBtn.hide = ['.main', '.main-container', '.settings-btn.main'];
artistsBtn.addEventListener('click', (elem) => {
  nextBtnPopup.show = ['.categories-page.artists', '.icon'];
  nextBtnPopup.hide = ['.answer-popup', '.artists-mode', '.pagination-btn.back'];
  backBtn.show = ['.categories-page.artists', '.icon'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.artists-mode'];
  toggleBlock(elem);
});

picturesBtn.show = ['.categories-page.pictures', '.pagination'];
picturesBtn.hide = ['.main', '.main-container', '.settings-btn.main'];
picturesBtn.addEventListener('click', (elem) => {
  nextBtnPopup.show = ['.categories-page.pictures', '.icon'];
  nextBtnPopup.hide = ['.answer-popup', '.pictures-mode', '.pagination-btn.back'];
  backBtn.show = ['.categories-page.pictures', '.icon'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.pictures-mode'];
  toggleBlock(elem);
});

homeBtn.show = ['.main-container', '.select-type', '.main', '.icon'];
homeBtn.hide = ['.categories-page.artists', '.categories-page.pictures', '.pagination', '.pagination-btn.back', '.artists-mode', '.pictures-mode', '.answer-popup', '.category-score'];
homeBtn.addEventListener('click', endGame);

homeBtnPopup.show = homeBtn.show;
homeBtnPopup.hide = homeBtn.hide;
homeBtnPopup.addEventListener('click', toggleBlock);

nextBtnPopup.addEventListener('click', endGame);
backBtn.addEventListener('click', endGame);

artistsPage.addEventListener('click', (elem) => {
  if (elem.target.classList.contains('category-results')) {
    artistsPage.show = ['.category-score', '.pagination-btn.back'];
    artistsPage.hide = ['.categories-page.artists'];
    toggleBlock(elem);
    displayScore(true, elem.target.parentElement.parentElement);
  } else {
    artistsPage.show = ['.artists-mode', '.pagination-btn.back'];
    artistsPage.hide = ['.categories-page.artists', '.icon'];
    toggleBlock(elem);
    initGame(true, elem.target.querySelector('.category-number').innerHTML);
  }
});

picturesPage.addEventListener('click', (elem) => {
  if (elem.target.classList.contains('category-results')) {
    picturesPage.show = ['.category-score', '.pagination-btn.back'];
    picturesPage.hide = ['.categories-page.pictures'];
    toggleBlock(elem);
    displayScore(false, elem.target.parentElement.parentElement);
  } else {
    picturesPage.show = ['.pictures-mode', '.pagination-btn.back'];
    picturesPage.hide = ['.categories-page.pictures', 'icon'];
    toggleBlock(elem);
    initGame(false, elem.target.querySelector('.category-number').innerHTML);
  }
});

volumeBar.addEventListener('input', changeVolume);
timeBar.addEventListener('input', setTimeInterval);
saveBtn.addEventListener('click', saveSettings);
popupBtn.addEventListener('click', nextQuestion);

document.querySelector('.mute-icon').addEventListener('click', mute);
document.getElementById('time-mode').addEventListener('click', toggleTimeMode);
document.getElementById('default-btn').addEventListener('click', setDefault);
document.querySelector('.answers').addEventListener('click', checkAnswer);
document.querySelector('.picture-answers').addEventListener('click', checkAnswer);

document.querySelectorAll('.score-image').forEach(item => {
  item.addEventListener('click', showPictureInfo);
});

window.addEventListener('load', function () {
  timeLimit = +localStorage.getItem('timeLimit') || 25;
  timeBar.value = timeLimit / 5 - 1;
  timeMode = JSON.parse(localStorage.getItem('timeMode'));
  volume = localStorage.getItem('volume');
  if (volume == null) {
    volume = .8;
  } else {
    volume = +volume;
  }
  volumeBar.value = volume * 10;
  displayPreviews();
  initSettings();
  displayAttemptedCategory();
});