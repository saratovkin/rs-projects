import MiscFunctions from './components/misc';
import AudioEffects from './components/settings/audioEffects';
import SoundUrls from './components/settings/soundUrls';
import GameSettings from './components/settings/gameSettings';

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

let timerInterval;
let questionTimeOut;
let timeLeft;

let questionNumber;
let cardNumber;
let correctAnswer;
let images;
let roundResults;

let answersCounter;

let audioEffects;
let gameSettings;

function displayPreviews() {
  let index = 0;
  document.querySelectorAll('.category').forEach((item) => {
    item.querySelector('.category-number').innerHTML = (index >= 120) ? ((index - 120) / 10 + 1) : (index / 10 + 1);
    const img = new Image();
    img.src = MiscFunctions.getImageURL(index);
    img.onload = () => {
      item.querySelector('.category-img').style.backgroundImage = `url(${img.src})`;
    };
    index += 10;
  });
  document.querySelector('.category.blitz').querySelector('.category-number').innerHTML = 'Blitz';
}

async function getImageData() {
  try {
    const url = 'https://raw.githubusercontent.com/saratovkin/art-quiz-json/main/images.json';
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('an error has occurred');
    return null;
  }
}

function showQuestionInfo(flag, current) {
  const img = new Image();
  img.src = MiscFunctions.getImageURL(current.imageNum);
  img.onload = () => {
    if (flag) {
      document.querySelector('.image-question').style.backgroundImage = `url(${img.src})`;
    }
    document.querySelector('.popup-image').style.backgroundImage = `url(${img.src})`;
  };
  document.querySelector('.popup-info').innerHTML = `${current.name}<br>${current.author}<br>${current.year}`;
}

function getEmoji(elem) {
  let type;
  elem.className = '';
  elem.classList.add('final-icon');
  if (answersCounter < 2) {
    type = 'very-bad';
    audioEffects.playAudio(SoundUrls.cricketsSoundUrl);
  }
  if (answersCounter >= 2 && answersCounter < 4) {
    type = 'bad';
    audioEffects.playAudio(SoundUrls.loseSoundUrl);
  }
  if (answersCounter >= 4 && answersCounter < 6) {
    type = 'normal';
    audioEffects.playAudio(SoundUrls.winSoundUrl);
  }
  if (answersCounter >= 6 && answersCounter < 9) {
    type = 'good';
    audioEffects.playAudio(SoundUrls.winSoundUrl);
  }
  if (answersCounter >= 9) {
    type = 'very-good';
    audioEffects.playAudio(SoundUrls.winSoundUrl);
  }
  elem.classList.add(type);
}

function showRoundResult() {
  const finalPopup = document.querySelector('.popup-final');
  document.querySelector('.artists-mode').classList.add('blocked');
  document.querySelector('.answer-popup').classList.remove('hide');
  document.querySelector('.popup-next').classList.add('hide');
  finalPopup.querySelector('.final-score').textContent = `${answersCounter}/10`;
  getEmoji(finalPopup.querySelector('.final-icon'));
}

function checkAnswer(elem) {
  let answer;
  if (audioEffects.soundEffect) {
    audioEffects.soundEffect.pause();
  }
  if (elem) {
    answer = elem.target;
  }
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  gameSettings.timerInfo.classList.remove('last-seconds');
  if ((answer && answer.innerHTML === correctAnswer.author)
    || (answer && answer.num === correctAnswer.imageNum)) {
    roundResults.push(true);
    answersCounter += 1;
    answer.classList.add('correct');
    if (cardNumber <= 12) {
      answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('correct');
    } else {
      answerIndicators[10 + questionNumber - (cardNumber - 1) * 10].classList.add('correct');
    }
    popupIcon.classList.remove('wrong');
    audioEffects.playAudio(SoundUrls.rightSoundUrl);
  } else {
    roundResults.push(false);
    if (answer) {
      answer.classList.add('wrong');
    }
    if (cardNumber <= 12) {
      answerIndicators[questionNumber - (cardNumber - 1) * 10].classList.add('wrong');
    } else {
      answerIndicators[10 + questionNumber - (cardNumber - 1) * 10].classList.add('wrong');
    }
    popupIcon.classList.add('wrong');
    audioEffects.playAudio(SoundUrls.wrongSoundUrl);
  }
  document.querySelector('.artists-mode').classList.add('blocked');
  document.querySelector('.pictures-mode').classList.add('blocked');
  document.querySelector('.answer-popup').classList.remove('hide');
}

function showAristsQuestion(qNum) {
  let randomAnswer;
  let tempTime;
  document.querySelectorAll('.answer').forEach((item) => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  document.querySelector('.artists-mode').classList.remove('blocked');
  document.querySelector('.artists-mode').classList.add('slide-bottom');
  document.querySelector('.page-name').innerHTML = 'Кто автор данной картины?';
  document.querySelector('.page-name').style.opacity = '1';
  const currentQuestion = images[qNum];
  showQuestionInfo(true, currentQuestion);
  correctAnswer = currentQuestion;
  const answers = [];
  answers.push(correctAnswer.author);
  while (answers.length !== 4) {
    randomAnswer = images[MiscFunctions.getRandomNum(240)].author;
    if (!answers.includes(randomAnswer)) {
      answers.push(randomAnswer);
    }
  }
  MiscFunctions.shuffle(answers);
  document.querySelectorAll('.answer').forEach((item) => {
    const temp = answers.pop();
    item.innerHTML = temp;
  });
  if (gameSettings.timeMode) {
    tempTime = gameSettings.timeLimit;
    gameSettings.timerInfo.innerHTML = `00:${(tempTime.toString()).padStart(2, '0')}`;
    timerInterval = setInterval(() => {
      tempTime -= 1;
      if (tempTime === 3) {
        audioEffects.playAudio('assets/sound-effects/timer.mp3');
        gameSettings.timerInfo.classList.add('last-seconds');
      }
      gameSettings.timerInfo.innerHTML = `00:${(tempTime.toString()).padStart(2, '0')}`;
    }, 1000);
    questionTimeOut = setTimeout(() => checkAnswer(), gameSettings.timeLimit * 1000);
  }
}

function showPicturesQuestion(qNum) {
  let randomAnswer;
  let tempTime;
  const answers = [];
  const authors = [];
  document.querySelectorAll('.picture-answer').forEach((item) => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  const currentQuestion = images[qNum];
  document.querySelector('.pictures-mode').classList.add('slide-bottom');
  document.querySelector('.pictures-mode').classList.remove('blocked');
  document.querySelector('.page-name').innerHTML = `Какую картину нарисовал ${currentQuestion.author}?`;
  document.querySelector('.page-name').style.opacity = '1';
  showQuestionInfo(false, currentQuestion);
  correctAnswer = currentQuestion;
  authors.push(correctAnswer.author);
  answers.push(currentQuestion);
  while (answers.length !== 4) {
    randomAnswer = images[MiscFunctions.getRandomNum(240)];
    if (!authors.includes(randomAnswer.author)) {
      authors.push(randomAnswer.author);
      answers.push(randomAnswer);
    }
  }
  MiscFunctions.shuffle(answers);
  document.querySelectorAll('.picture-answer').forEach((item) => {
    const temp = answers.pop();
    const img = new Image();
    img.src = MiscFunctions.getImageURL(temp.imageNum);
    img.onload = () => {
      item.style.backgroundImage = `url(${img.src})`;
    };
    item.num = temp.imageNum;
  });
  if (gameSettings.timeMode) {
    tempTime = gameSettings.timeLimit;
    gameSettings.timerInfo.textContent = `00:${(tempTime.toString()).padStart(2, '0')}`;
    timerInterval = setInterval(() => {
      tempTime -= 1;
      if (tempTime === 3) {
        audioEffects.playAudio('assets/sound-effects/timer.mp3');
        gameSettings.timerInfo.classList.add('last-seconds');
      }
      gameSettings.timerInfo.textContent = `00:${(tempTime.toString()).padStart(2, '0')}`;
    }, 1000);
    questionTimeOut = setTimeout(() => checkAnswer(), gameSettings.timeLimit * 1000);
  }
}

function displayAttemptedCategory() {
  const attempted = JSON.parse(localStorage.getItem('attempted')) || [];
  const blitzMax = JSON.parse(localStorage.getItem('blitz-max')) || null;
  let temp;
  attempted.forEach((item, index) => {
    if (item !== null) {
      temp = document.querySelectorAll('.category')[index];
      temp.classList.add('attempted');
      temp.querySelector('.category-stats').innerHTML = `${item.answersCounter}/10`;
    }
  });
  if (blitzMax !== null) {
    const blitzCard = document.querySelector('.category.blitz');
    blitzCard.classList.add('attempted');
    blitzCard.querySelector('.category-number').style.opacity = 1;
    blitzCard.querySelector('.category-number').innerHTML = `best : ${blitzMax}`;
  }
}

function nextQuestion() {
  questionNumber += 1;
  document.querySelector('.answer-popup').classList.add('hide');
  if ((cardNumber * 10 - 1) >= questionNumber) {
    if (cardNumber <= 12) {
      showAristsQuestion(questionNumber);
    } else {
      showPicturesQuestion(questionNumber);
    }
  } else {
    const results = JSON.parse(localStorage.getItem('attempted')) || [];
    results[cardNumber - 1] = { answersCounter, roundResults };
    localStorage.setItem('attempted', JSON.stringify(results));
    showRoundResult();
    displayAttemptedCategory();
  }
}

function endBlitz() {
  let maxScore = JSON.parse(localStorage.getItem('blitz-max')) || 0;
  timeLeft = 30;
  gameSettings.timerInfo.textContent = '00:00';
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  const finalPopup = document.querySelector('.popup-final');
  document.querySelector('.final-text').innerHTML = 'Время вышло!<br>Ваши очки:';
  document.querySelector('.artists-mode').classList.add('blocked');
  document.querySelector('.answer-popup').classList.remove('hide');
  document.querySelector('.popup-next').classList.add('hide');
  finalPopup.querySelector('.final-score').textContent = answersCounter;
  getEmoji(finalPopup.querySelector('.final-icon'));
  maxScore = (answersCounter > maxScore) ? answersCounter : maxScore;
  localStorage.setItem('blitz-max', JSON.stringify(maxScore));
  displayAttemptedCategory();
}

function showBlitzQuestion(time) {
  audioEffects.audioParams.isAudioEnabled = true;
  setTimeout(() => {
    document.querySelectorAll('.blitz-answer').forEach((item) => {
      item.classList.remove('correct');
      item.classList.remove('wrong');
    });
  }, 300);
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  if (timeLeft !== 0) {
    timeLeft = time || 30;
  }
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  gameSettings.timerInfo.textContent = `00:${(timeLeft.toString()).padStart(2, '0')}`;
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft === 3) {
      gameSettings.timerInfo.classList.add('last-seconds');
    }
    gameSettings.timerInfo.textContent = `00:${(timeLeft.toString()).padStart(2, '0')}`;
  }, 1000);
  questionTimeOut = setTimeout(() => endBlitz(), timeLeft * 1000);
  document.querySelector('.blitz-mode').classList.add('slide-bottom');
  document.querySelector('.page-name').style.opacity = '1';
  document.querySelectorAll('.answer.blitz').forEach((item) => {
    item.classList.remove('correct');
    item.classList.remove('wrong');
  });
  const currentQuestion = images[MiscFunctions.getRandomNum(240)];
  correctAnswer = Math.random() < 0.5;
  const img = new Image();
  img.src = MiscFunctions.getImageURL(currentQuestion.imageNum);
  img.onload = () => {
    document.querySelector('.image-question.blitz').style.backgroundImage = `url(${img.src})`;
  };
  if (correctAnswer) {
    document.querySelector('.page-name').innerHTML = `Эту картину нарисовал <br>${currentQuestion.author}?`;
  } else {
    let randomIndex = MiscFunctions.getRandomNum(240);
    while (currentQuestion.imageNum === randomIndex) {
      randomIndex = MiscFunctions.getRandomNum(240);
    }
    const anotherQuestion = images[randomIndex];
    document.querySelector('.page-name').innerHTML = `Эту картину нарисовал <br>${anotherQuestion.author}?`;
  }
}

function blitzNext(elem) {
  let answer = elem.target.innerHTML;
  answer = (answer === 'Да');
  if (answer === correctAnswer) {
    elem.target.classList.add('correct');
    audioEffects.playAudio(SoundUrls.rightSoundUrl);
    answersCounter += 1;
    timeLeft += 1;
    showBlitzQuestion(timeLeft);
  } else {
    elem.target.classList.add('wrong');
    audioEffects.playAudio(SoundUrls.wrongSoundUrl);
    timeLeft -= 4;
    showBlitzQuestion(timeLeft);
  }
}

function initGame(flag, card) {
  document.querySelector('.icon').classList.remove('slide');
  document.querySelector('.final-text').textContent = 'Вы ответили на все вопросы!';
  images = getImageData();
  document.querySelector('.page-name').textContent = '';
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
    answerIndicators.forEach((item) => {
      item.classList.remove('correct');
      item.classList.remove('wrong');
    });
    images.then((res) => {
      images = res;
      if (flag) {
        showAristsQuestion(questionNumber);
      } else {
        showPicturesQuestion(questionNumber);
      }
    });
  }
}

function clearAnimations() {
  document.querySelectorAll('.category.artists').forEach((item) => {
    item.classList.remove('jump-up');
  });
  document.querySelectorAll('.category.pictures').forEach((item) => {
    item.classList.remove('jump-up');
  });
  document.querySelector('.pagination').classList.remove('slide-left');
}

function hidePictureInfo() {
  document.querySelectorAll('.score-image').forEach((item) => {
    item.classList.remove('clicked');
  });
}

function animateCategories(category) {
  document.querySelector('.pagination').classList.add('slide-left');
  document.querySelectorAll(`.category${category}`).forEach((item, index) => {
    setTimeout(() => { item.classList.add('jump-up'); }, index * 70);
  });
}

function showMainPage() {
  document.body.style.opacity = 1;
  document.querySelector('.icon').classList.add('slide');
  setTimeout(() => {
    document.querySelector('.footer-container').classList.add('fade');
  }, 500);

  const buttons = document.querySelectorAll('.main-field');
  buttons[0].classList.add('slide-left');
  buttons[1].classList.add('slide-from-top');
  buttons[2].classList.add('slide-right');
  gameSettings.settingsBtn.classList.add('slide-bottom');
}

function endGame(elem) {
  if (audioEffects.soundEffect) {
    audioEffects.soundEffect.pause();
  }
  gameSettings.timerInfo.classList.remove('last-seconds');
  gameSettings.timerInfo.innerHTML = '';
  document.querySelector('.page-name').innerHTML = '';
  document.querySelector('.page-name').style.opacity = '0';
  clearAnimations();
  hidePictureInfo();
  clearInterval(timerInterval);
  clearTimeout(questionTimeOut);
  animateCategories(elem.currentTarget.hide[2].split('-')[0]);
  MiscFunctions.toggleBlock(elem);
  showMainPage();
}

function displayScore(flag, elem) {
  images = getImageData();
  images.then((res) => {
    const results = JSON.parse(localStorage.getItem('attempted')) || [];
    let cardIndex = elem.querySelector('.category-number').innerHTML;
    cardIndex = flag ? cardIndex : (+cardIndex + 12);
    let temp = (cardIndex - 1) * 10;
    const catName = elem.querySelector('.category-name').innerHTML;
    const cards = res.slice(temp, temp + 10);
    document.querySelectorAll('.score-card').forEach((item, questionIndex) => {
      item.number = cardIndex;
      const img = new Image();
      img.src = MiscFunctions.getImageURL(temp);
      img.onload = () => {
        item.querySelector('.score-image').style.backgroundImage = `url(${img.src})`;
      };
      item.querySelector('.score-title').innerHTML = catName;
      item.querySelector('.score-image-info').innerHTML = `${cards[questionIndex].name} <br>${cards[questionIndex].author}<br>${cards[questionIndex].year}`;
      if (results[cardIndex - 1]) {
        if (results[cardIndex - 1].roundResults[questionIndex]) {
          item.querySelector('.score-image').classList.add('played');
        } else {
          item.querySelector('.score-image').classList.remove('played');
        }
      }
      setTimeout(() => { item.classList.add('jump-up'); }, questionIndex * 70);
      temp += 1;
    });
  });
}

function showPictureInfo(elem) {
  elem.target.classList.toggle('clicked');
}

function setDefault() {
  gameSettings.setDefault();
  audioEffects.setDefault();
}

artistsBtn.show = ['.categories-page.artists', '.pagination'];
artistsBtn.hide = ['.main', '.main-page', '.settings-btn.main'];
artistsBtn.addEventListener('click', (elem) => {
  animateCategories('.artists');
  nextBtnPopup.show = ['.categories-page.artists'];
  nextBtnPopup.hide = ['.answer-popup', '.pagination-btn.back', '.artists-mode'];
  backBtn.show = ['.categories-page.artists'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.artists-mode'];
  MiscFunctions.toggleBlock(elem);
});

picturesBtn.show = ['.categories-page.pictures', '.pagination'];
picturesBtn.hide = ['.main', '.main-page', '.settings-btn.main'];
picturesBtn.addEventListener('click', (elem) => {
  animateCategories('.pictures');
  nextBtnPopup.show = ['.categories-page.pictures'];
  nextBtnPopup.hide = ['.answer-popup', '.pagination-btn.back', '.pictures-mode'];
  backBtn.show = ['.categories-page.pictures'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.pictures-mode'];
  MiscFunctions.toggleBlock(elem);
});

blitzBtn.show = ['.categories-page.blitz', '.pagination'];
blitzBtn.hide = ['.main', '.main-page', '.settings-btn.main'];
blitzBtn.addEventListener('click', (elem) => {
  animateCategories('.blitz');
  nextBtnPopup.show = ['.categories-page.blitz'];
  nextBtnPopup.hide = ['.answer-popup', '.pagination-btn.back', '.blitz-mode'];
  backBtn.show = ['.categories-page.blitz'];
  backBtn.hide = ['.category-score', '.pagination-btn.back', '.blitz-mode'];
  MiscFunctions.toggleBlock(elem);
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
    MiscFunctions.toggleBlock(elem);
    displayScore(true, elem.target.parentElement.parentElement);
  } else {
    artistsPage.show = ['.artists-mode', '.pagination-btn.back'];
    artistsPage.hide = ['.categories-page.artists'];
    MiscFunctions.toggleBlock(elem);
    initGame(true, elem.target.querySelector('.category-number').innerHTML);
  }
});

picturesPage.addEventListener('click', (elem) => {
  if (elem.target.classList.contains('category-results')) {
    picturesPage.show = ['.category-score', '.pagination-btn.back'];
    picturesPage.hide = ['.categories-page.pictures'];
    MiscFunctions.toggleBlock(elem);
    displayScore(false, elem.target.parentElement.parentElement);
  } else {
    picturesPage.show = ['.pictures-mode', '.pagination-btn.back'];
    picturesPage.hide = ['.categories-page.pictures'];
    MiscFunctions.toggleBlock(elem);
    initGame(false, elem.target.querySelector('.category-number').innerHTML);
  }
});

blitzPage.addEventListener('click', (elem) => {
  if (elem.target.classList.contains('category-results')) {
    blitzPage.show = ['.category-score', '.pagination-btn.back'];
    blitzPage.hide = ['.categories-page.blitz'];
    MiscFunctions.toggleBlock(elem);
    displayScore(false, elem.target.parentElement.parentElement);
  } else {
    blitzPage.show = ['.blitz-mode', '.pagination-btn.back'];
    blitzPage.hide = ['.categories-page.blitz'];
    MiscFunctions.toggleBlock(elem);
    initGame();
  }
});

popupBtn.addEventListener('click', nextQuestion);
document.getElementById('time-mode').addEventListener('click', () => { gameSettings.toggleTimeMode(); });
document.getElementById('default-btn').addEventListener('click', setDefault);
document.querySelector('.answers').addEventListener('click', checkAnswer);
document.querySelector('.picture-answers').addEventListener('click', checkAnswer);
document.querySelector('.blitz-answers').addEventListener('click', blitzNext);

document.querySelectorAll('.score-image').forEach((item) => {
  item.addEventListener('click', showPictureInfo);
});

window.addEventListener('load', () => {
  audioEffects = new AudioEffects();
  gameSettings = new GameSettings();
  audioEffects.initAudioListeners();
  gameSettings.initGameListeners();
  displayPreviews();
  displayAttemptedCategory();
  showMainPage();
});
