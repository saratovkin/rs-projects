import MiscFunctions from './misc.js';




const misc = new MiscFunctions();

const volumeBar = document.getElementById('volume-bar');
const timeBar = document.getElementById('time-bar');
const musicBar = document.getElementById('music-bar');

const settingsBtn = document.getElementById('settings-btn');
const saveBtn = document.getElementById('save-btn');

const artistsBtn = document.getElementById('artists-mode');
const picturesBtn = document.getElementById('pictures-mode');
const blitzBtn = document.getElementById('blitz-mode');

const homeBtn = document.getElementById('home-btn');
const backBtn = document.getElementById('back-btn');

const homeBtnPopup = document.getElementById('home-btn-popup');
const nextBtnPopup = document.getElementById('next-btn-popup');

const answerIndicators = document.querySelectorAll('.question-bullet');

const artistsPage = document.querySelector('.categories-page.artists');
const picturesPage = document.querySelector('.categories-page.pictures');
const blitzPage = document.querySelector('.categories-page.blitz');

const popupIcon = document.querySelector('.popup-icon');
const popupBtn = document.querySelector('.popup-btn');

const timerInfo = document.querySelector('.pagination-timer');

let timeMode;
let timeLimit;

let timerInterval;
let questionTimeOut;
let timeLeft;

let questionNumber;
let cardNumber;
let correctAnswer;
let images;
let roundResults;

let answersCounter;

let volume;
let tempVolume;
let soundEffect;
let bgMusic;

let musicVolume;
let tempMusicVolume;

let isAudioEnabled = true;

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

function muteEffects() {
  if (volume == 0) {
    volumeBar.value = tempVolume;
  } else {
    tempVolume = volumeBar.value;
    volumeBar.value = 0;
  }
  changeVolume();
}

function displayMusicVolume() {
  if (bgMusic) {
    bgMusic.volume = musicVolume;
    bgMusic.addEventListener('ended', playBgMusic);
    bgMusic.play();
  }
  document.getElementById('music-sub').style.width = `${musicBar.value}%`;
}

function setMusicVolume() {
  musicVolume = musicBar.value / 100;
  if (musicVolume == 0) {
    document.querySelector('.note-icon').style.backgroundImage = 'url("assets/svg/settings/music-mute-icon.svg")';
  } else {
    document.querySelector('.note-icon').style.backgroundImage = 'url("assets/svg/settings/music-icon.svg")';
  }
  displayMusicVolume();
}

function muteMusic() {
  if (musicVolume == 0) {
    musicBar.value = tempMusicVolume;
  } else {
    tempMusicVolume = musicBar.value;
    musicBar.value = 0;
  }
  setMusicVolume();
}

function playAudio(url) {
  soundEffect = new Audio(url);
  soundEffect.volume = volume;
  soundEffect.play();
}

function playBgMusic() {
  if (!bgMusic) {
    bgMusic = new Audio("assets/sound-effects/bg-music.mp3");
    bgMusic.volume = musicVolume;
  }
  bgMusic.play();
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
  localStorage.setItem('volume', volumeBar.value / 100);
  localStorage.setItem('music-volume', musicBar.value / 100);
  document.querySelectorAll('.main-field').forEach(item => {
    item.classList.remove('flip');
  });
  settingsBtn.classList.remove('slide-bottom');
  toggleBlock(elem);
}

function setDefault() {
  timeBar.value = 3;
  timeMode = false;
  volume = 0.8;
  musicVolume = 0.2;
  volumeBar.value = 80;
  musicBar.value = 20;
  initSettings();
}

function initSettings() {
  document.getElementById('time-checkbox').checked = timeMode;
  setTimeInterval();
  setVolume();
  setMusicVolume();
  showTimeMode();
}

function displayPreviews() {
  let index = 0;
  document.querySelectorAll('.category').forEach(item => {
    item.querySelector('.category-number').innerHTML = (index >= 120) ? ((index - 120) / 10 + 1) : (index / 10 + 1);
    const img = new Image();
    img.src = misc.getImageURL(index);
    img.onload = () => {
      item.querySelector('.category-img').style.backgroundImage = `url(${img.src})`;
    };
    index += 10;
  });
  document.querySelector('.category.blitz').querySelector('.category-number').innerHTML = 'Blitz';
}

function initGame(flag, card) {
  document.querySelector('.icon').classList.remove('slide');
  document.querySelector('.final-text').innerHTML = 'Вы ответили на все вопросы!';
  images = getImageData();
  document.querySelector('.page-name').innerHTML = '';
  document.querySelector('.page-name').style.opacity = '0';
  document.querySelector('.popup-next').classList.remove('hide');
  answersCounter = 0;
  if (!flag && !card) {
    images.then((res) => {
      images = res;
      showBlitzQuestion();
    });

  } else {
    cardNumber = flag ? card : (+card + 12);
    questionNumber = (cardNumber - 1) * 10;
    roundResults = [];
    answerIndicators.forEach(item => {
      item.classList.remove('correct');
      item.classList.remove('wrong');
    });
    images.then((res) => {
      images = res;
      flag ? showAristsQuestion(questionNumber) : showPicturesQuestion(questionNumber);
    });
  }
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
  document.querySelectorAll('.answer').forEach(item => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  document.querySelector('.artists-mode').classList.remove('blocked');
  document.querySelector('.artists-mode').classList.add('slide-bottom');
  document.querySelector('.page-name').innerHTML = 'Кто автор данной картины?';
  document.querySelector('.page-name').style.opacity = '1';
  let currentQuestion = images[qNum];
  showQuestionInfo(true, currentQuestion);
  correctAnswer = currentQuestion;
  let randomAnswer;
  let answers = [];
  answers.push(correctAnswer.author);
  while (answers.length != 4) {
    randomAnswer = images[misc.getRandomNum(240)].author;
    if (!answers.includes(randomAnswer)) {
      answers.push(randomAnswer);
    }
  }
  misc.shuffle(answers);
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
  document.querySelector('.pictures-mode').classList.add('slide-bottom');
  document.querySelector('.pictures-mode').classList.remove('blocked');
  document.querySelector('.page-name').innerHTML = `Какую картину нарисовал ${currentQuestion.author}?`;
  document.querySelector('.page-name').style.opacity = '1';
  showQuestionInfo(false, currentQuestion);
  correctAnswer = currentQuestion;
  let randomAnswer;
  let answers = [];
  let authors = []
  authors.push(correctAnswer.author);
  answers.push(currentQuestion);
  while (answers.length != 4) {
    randomAnswer = images[misc.getRandomNum(240)];
    if (!authors.includes(randomAnswer.author)) {
      authors.push(randomAnswer.author)
      answers.push(randomAnswer);
    }
  }
  misc.shuffle(answers);
  document.querySelectorAll('.picture-answer').forEach(item => {
    let temp = answers.pop();
    const img = new Image();
    img.src = misc.getImageURL(temp.imageNum);
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
  img.src = misc.getImageURL(current.imageNum);
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

function showBlitzQuestion(time) {
  isAudioEnabled = true;
  setTimeout(() => {
    document.querySelectorAll('.blitz-answer').forEach(item => {
      item.classList.remove('correct');
      item.classList.remove('wrong');
    });
  }, 300);
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  if (timeLeft != 0) {
    timeLeft = time || 30;
  }
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  timerInfo.innerHTML = '00:' + (timeLeft + '').padStart(2, '0');
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft == 3) {
      timerInfo.classList.add('last-seconds');
    }
    timerInfo.innerHTML = '00:' + (timeLeft + '').padStart(2, '0');
  }, 1000);
  questionTimeOut = setTimeout(() => endBlitz(), timeLeft * 1000);
  document.querySelector('.blitz-mode').classList.add('slide-bottom');
  document.querySelector('.page-name').style.opacity = '1';
  document.querySelectorAll('.answer.blitz').forEach(item => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  let currentQuestion = images[misc.getRandomNum(240)];
  correctAnswer = Math.random() < 0.5;
  const img = new Image();
  img.src = misc.getImageURL(currentQuestion.imageNum);
  img.onload = () => {
    document.querySelector('.image-question.blitz').style.backgroundImage = `url(${img.src})`;
  };
  if (correctAnswer) {
    document.querySelector('.page-name').innerHTML = `Эту картину нарисовал <br>${currentQuestion.author}?`;
  } else {
    let randomIndex = misc.getRandomNum(240);
    while (currentQuestion.imageNum == randomIndex) {
      randomIndex = misc.getRandomNum(240);
    }
    let anotherQuestion = images[randomIndex];
    document.querySelector('.page-name').innerHTML = `Эту картину нарисовал <br>${anotherQuestion.author}?`;
  }
}

function blitzNext(elem) {
  let answer = elem.target.innerHTML;
  answer = (answer == 'Да') ? true : false;
  if (answer == correctAnswer) {
    elem.target.classList.add('correct');
    playAudio("assets/sound-effects/right.mp3");
    answersCounter++;
    timeLeft += 1;
    showBlitzQuestion(timeLeft);
  } else {
    elem.target.classList.add('wrong');
    playAudio("assets/sound-effects/wrong.mp3");
    timeLeft -= 4;
    showBlitzQuestion(timeLeft);
  }
}

function endBlitz() {
  timeLeft = 30;
  timerInfo.innerHTML = '00:00';
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  let finalPopup = document.querySelector('.popup-final');
  document.querySelector('.final-text').innerHTML = 'Время вышло!<br>Ваши очки:';
  document.querySelector('.artists-mode').classList.add('blocked');
  document.querySelector('.answer-popup').classList.remove('hide');
  document.querySelector('.popup-next').classList.add('hide');
  finalPopup.querySelector('.final-score').innerHTML = answersCounter;
  getEmoji(finalPopup.querySelector('.final-icon'));
  let maxScore = JSON.parse(localStorage.getItem('blitz-max')) || 0;
  maxScore = (answersCounter > maxScore) ? answersCounter : maxScore;
  localStorage.setItem('blitz-max', JSON.stringify(maxScore));
  displayAttemptedCategory();
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
    playAudio("assets/sound-effects/crickets.mp3");
  }
  if (answersCounter >= 2 && answersCounter < 4) {
    type = 'bad';
    playAudio("assets/sound-effects/lose.mp3");
  }
  if (answersCounter >= 4 && answersCounter < 6) {
    type = 'normal';
    playAudio("assets/sound-effects/win.mp3");
  }
  if (answersCounter >= 6 && answersCounter < 9) {
    type = 'good';
    playAudio("assets/sound-effects/win.mp3");
  }
  if (answersCounter >= 9) {
    type = 'very-good';
    playAudio("assets/sound-effects/win.mp3");
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
  let blitzMax = JSON.parse(localStorage.getItem('blitz-max')) || null;
  if (blitzMax != null) {
    let blitzCard = document.querySelector('.category.blitz');
    blitzCard.classList.add('attempted');
    blitzCard.querySelector('.category-number').style.opacity = 1;
    blitzCard.querySelector('.category-number').innerHTML = `best : ${blitzMax}`;
  }
}

function endGame(elem) {
  if (soundEffect) {
    soundEffect.pause();
  }
  timerInfo.classList.remove('last-seconds');
  timerInfo.innerHTML = '';
  document.querySelector('.page-name').innerHTML = '';
  document.querySelector('.page-name').style.opacity = '0';
  clearAnimations();
  hidePictureInfo();
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  animateCategories(elem.currentTarget.hide[2].split('-')[0]);
  toggleBlock(elem);
  showMainPage();
}

function displayScore(flag, elem) {
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
      img.src = misc.getImageURL(temp);
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
      setTimeout(() => { item.classList.add('jump-up') }, questionIndex * 70);
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

function showMainPage() {
  document.body.style.opacity = 1;
  document.querySelector('.icon').classList.add('slide');
  let buttons = document.querySelectorAll('.main-field');
  buttons[0].classList.add('slide-left');
  buttons[1].classList.add('slide-from-top');
  buttons[2].classList.add('slide-right');
  settingsBtn.classList.add('slide-bottom');
}

function animateCategories(category) {
  document.querySelector('.pagination').classList.add('slide-left');
  document.querySelectorAll(`.category${category}`).forEach((item, index) => {
    setTimeout(() => { item.classList.add('jump-up') }, index * 70);
  });
}

function animateSettings(elem) {
  document.querySelectorAll('.main-field').forEach(item => {
    item.classList.add('flip');
  })
  toggleBlock(elem);
}

function clearAnimations() {
  document.querySelectorAll('.category.artists').forEach(item => {
    item.classList.remove('jump-up');
  });
  document.querySelectorAll('.category.pictures').forEach(item => {
    item.classList.remove('jump-up');
  });
  document.querySelector('.pagination').classList.remove('slide-left');
}

function logScore() {
  console.log(`

                        Самооценка: 234/220

  -Стартовая страница и навигация 20/20
  -Настройки 40/40
  -Страница категорий 30/30
  -Страница с вопросами 50/50
  -Страница с результатами 50/50
  -Одновременная загрузка и плавная смена изображений 10/10
  -Анимация 20/20, 4 уникальные анимации:
    • анимация отображения главной страницы
    • анимация отображения настроек
    • анимация отображения карточек категорий
    • анимация отображения страницы самой викторины
  -Дополнительный функционал 14/20
    • меняется звук завершения раунда и смайлик в зависимости от результа (0-1, 2-3, 4-5, 6-8, 9-10) +2 балла
    • есть фоновая музыка, громкость которой можно менять в отдельном пункте настроек. 
  громкость по умолчанию 20%, при открытии страницы музыка начинает играть только после первого 
  взаимодействия со страницей (иначе воспроизведение блокируется) +2 балла
    • добавлен третий игровой режим: блиц. изначально дается 30 секунд, 
  за каждый правильный ответ +1 секунда, за каждый неправильный -4 секунды.
  итоговый результат - общее количество правильных ответов за отведенное время. +10 баллов.

  Если вы обнаружили какой-либо баг или у вас есть вопросы по работе викторины - мой дискорд:
                                      @saratovkin
  `)
}

settingsBtn.show = ['.settings-field', , '.button-container'];
settingsBtn.hide = ['.settings-btn.main'];
settingsBtn.addEventListener('click', animateSettings);

saveBtn.show = ['.settings-btn.main'];
saveBtn.hide = ['.button-container'];
saveBtn.addEventListener('click', saveSettings);

artistsBtn.show = ['.categories-page.artists', '.pagination'];
artistsBtn.hide = ['.main', '.main-page', '.settings-btn.main'];
artistsBtn.addEventListener('click', (elem) => {
  animateCategories('.artists');
  nextBtnPopup.show = ['.categories-page.artists'];
  nextBtnPopup.hide = ['.answer-popup', '.pagination-btn.back', '.artists-mode'];
  backBtn.show = ['.categories-page.artists'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.artists-mode'];
  toggleBlock(elem);
});

picturesBtn.show = ['.categories-page.pictures', '.pagination'];
picturesBtn.hide = ['.main', '.main-page', '.settings-btn.main'];
picturesBtn.addEventListener('click', (elem) => {
  animateCategories('.pictures');
  nextBtnPopup.show = ['.categories-page.pictures'];
  nextBtnPopup.hide = ['.answer-popup', '.pagination-btn.back', '.pictures-mode'];
  backBtn.show = ['.categories-page.pictures'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.pictures-mode'];
  toggleBlock(elem);
});

blitzBtn.show = ['.categories-page.blitz', '.pagination'];
blitzBtn.hide = ['.main', '.main-page', '.settings-btn.main'];
blitzBtn.addEventListener('click', (elem) => {
  animateCategories('.blitz');
  nextBtnPopup.show = ['.categories-page.blitz'];
  nextBtnPopup.hide = ['.answer-popup', '.pagination-btn.back', '.blitz-mode'];
  backBtn.show = ['.categories-page.blitz'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.blitz-mode'];
  toggleBlock(elem);
});

homeBtn.show = ['.main-page', '.select-type', '.main'];
homeBtn.hide = ['.categories-page.artists', '.categories-page.pictures', '.categories-page.blitz', '.pagination',
  '.pagination-btn.back', '.artists-mode', '.pictures-mode', '.blitz-mode', '.answer-popup', '.category-score'];
homeBtn.addEventListener('click', endGame);

homeBtnPopup.show = homeBtn.show;
homeBtnPopup.hide = homeBtn.hide;
homeBtnPopup.addEventListener('click', endGame);

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
    artistsPage.hide = ['.categories-page.artists'];
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
    picturesPage.hide = ['.categories-page.pictures'];
    toggleBlock(elem);
    initGame(false, elem.target.querySelector('.category-number').innerHTML);
  }
});

blitzPage.addEventListener('click', (elem) => {
  if (elem.target.classList.contains('category-results')) {
    blitzPage.show = ['.category-score', '.pagination-btn.back'];
    blitzPage.hide = ['.categories-page.blitz'];
    toggleBlock(elem);
    displayScore(false, elem.target.parentElement.parentElement);
  } else {
    blitzPage.show = ['.blitz-mode', '.pagination-btn.back'];
    blitzPage.hide = ['.categories-page.blitz'];
    toggleBlock(elem);
    initGame();
  }
});

volumeBar.addEventListener('input', changeVolume);
timeBar.addEventListener('input', setTimeInterval);
musicBar.addEventListener('input', setMusicVolume);
saveBtn.addEventListener('click', saveSettings);
popupBtn.addEventListener('click', nextQuestion);

document.querySelector('.mute-icon').addEventListener('click', muteEffects);
document.querySelector('.note-icon').addEventListener('click', muteMusic);
document.getElementById('time-mode').addEventListener('click', toggleTimeMode);
document.getElementById('default-btn').addEventListener('click', setDefault);
document.querySelector('.answers').addEventListener('click', checkAnswer);
document.querySelector('.picture-answers').addEventListener('click', checkAnswer);
document.querySelector('.blitz-answers').addEventListener('click', blitzNext);
document.addEventListener('click', playBgMusic);

document.querySelectorAll('.score-image').forEach(item => {
  item.addEventListener('click', showPictureInfo);
});

window.addEventListener('load', function () {
  timeLimit = +localStorage.getItem('timeLimit') || 25;
  timeBar.value = timeLimit / 5 - 1;
  timeMode = JSON.parse(localStorage.getItem('timeMode'));
  volume = localStorage.getItem('volume') || 0.8;
  musicVolume = localStorage.getItem('music-volume') || 0.2;
  volumeBar.value = volume * 100;
  musicBar.value = musicVolume * 100;
  displayPreviews();
  initSettings();
  displayAttemptedCategory();
  showMainPage();
  logScore();
});