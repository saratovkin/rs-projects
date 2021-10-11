
//slick library init
$(document).ready(function () {
  $('.video-slider').slick({
    arrows: true,
    dots: true,
    slidesToShow: 3,
    speed: 1000,
    variableWidth: false,
    mobileFisrt: true,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });
});

function changeProgressBar() {
  let displayProgress = document.getElementById('bar-sub');
  displayProgress.style.width = `${progressBar.value}%`;
}

function changeVolumeBar() {
  let volume = document.getElementById('volume-bar');
  let volumeRange = document.getElementById('volume-sub');
  volumeRange.style.width = `${volume.value}%`;
}

function videoPlay() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playIcon.style.display = 'none';
    stopIcon.style.display = 'block';
    playIconMain.style.display = 'none';
  } else {
    videoPlayer.pause();
    playIcon.style.display = 'block';
    stopIcon.style.display = 'none';
    playIconMain.style.display = 'block';
  }
}

function showDefault() {
  playIcon.style.display = 'block';
  stopIcon.style.display = 'none';
  playIconMain.style.display = 'block';
  document.getElementById('bar-sub').style.width = '0px';
  progressBar.value = 0;
}

function videoProgress() {
  if (!isNaN(videoPlayer.duration)) {
    progressBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;

  }
  changeProgressBar();
}

function videoChangeTime() {
  if (progressBar.value == 100) {
    videoPlay();
  }
  videoPlayer.currentTime = (videoPlayer.duration * progressBar.value) / 100;
}

function videoChangeVolume() {
  videoPlayer.volume = volumeBar.value / 100;
  if (videoPlayer.volume == 0) {
    volumeIcon.style.display = 'none';
    muteIcon.style.display = 'block';
  } else {
    volumeIcon.style.display = 'block';
    muteIcon.style.display = 'none';
  }
  changeVolumeBar();
}

function videoMute() {
  if (videoPlayer.volume == 0) {
    volumeBar.value = tempVolume;
    videoPlayer.volume = volumeBar.value / 100;
    volumeIcon.style.display = 'block';
    muteIcon.style.display = 'none';
  } else {
    tempVolume = volumeBar.value;
    videoPlayer.volume = 0;
    volumeBar.value = 0;
    volumeIcon.style.display = 'none';
    muteIcon.style.display = 'block';
  }
  changeVolumeBar();
}

function fullScreenVideo() {
  if (fullScreenFlag) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    fullScreenIcon.style.display = 'block';
    smallScreenIcon.style.display = 'none';
    fullScreenFlag = false;
  } else {
    if (videoDiv.requestFullscreen) {
      videoDiv.requestFullscreen();
    }
    fullScreenIcon.style.display = 'none';
    smallScreenIcon.style.display = 'block';
    fullScreenFlag = true;
  }
}

function videoReduceSpeed() {
  videoPlayer.playbackRate = (videoPlayer.playbackRate - 0.25) || 0.25;
  showSpeed();
}

function videoIncreaseSpeed() {
  if (videoPlayer.playbackRate < 2) {
    videoPlayer.playbackRate = (videoPlayer.playbackRate + 0.25);
  }
  showSpeed();
}

function showSpeed() {
  clearTimeout(speedTimeout);
  document.getElementById('speed').innerHTML = videoPlayer.playbackRate + 'x';
  document.querySelector('.display-speed').classList.add('show-speed');
  speedTimeout = setTimeout(function () {
    document.querySelector('.display-speed').classList.remove('show-speed');
  }, 1000);
}

function videoHotKeys(e) {
  if (e.target.type === 'text' || e.target.type === 'tel' || e.target.type === 'email') {
    return;
  }
  if ((e.shiftKey && e.key === '>') || (e.shiftKey && e.key === 'Ю')) {
    videoIncreaseSpeed();
  }
  if ((e.shiftKey && e.key === '<') || (e.shiftKey && e.key === 'Б')) {
    videoReduceSpeed();
  }
  if (e.key === 'm' || e.key === 'M' || e.key === 'ь' || e.key === 'Ь') {
    videoMute();
  }
  if (e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') {
    fullScreenVideo();
  }
  if (e.code == 'Space') {
    e.preventDefault();
    videoPlay();
  }
}

function changeMainVideo() {
  let currentVideoIndex = document.querySelector('.slick-current').getAttribute('data-slick-index');
  let mainVideo = document.querySelector('.video-player');
  if (startIndex != currentVideoIndex) {
    startIndex = currentVideoIndex;
    mainVideo.setAttribute('src', `assets/video/video${currentVideoIndex}.mp4`);
    mainVideo.setAttribute('poster', `assets/video/poster${currentVideoIndex}.jpeg`);
    showDefault();
    // getYTFrames();
  }
}

let videoPlayer = document.querySelector('.video-player');

let progressBar = document.getElementById('progress-bar');
let volumeBar = document.getElementById('volume-bar');

let playIcon = document.getElementById('play');
let playIconMain = document.getElementById('playMain');
let stopIcon = document.getElementById('pause');
let volumeIcon = document.getElementById('unmute');
let muteIcon = document.getElementById('mute')
let fullScreenIcon = document.getElementById('enter-fullscreen');
let smallScreenIcon = document.getElementById('exit-fullscreen');

let videoDiv = document.querySelector('.videoplayer');

let tempVolume = 100;
let fullScreenFlag = false;
let speedTimeout;

videoPlayer.addEventListener('timeupdate', videoProgress);
videoPlayer.addEventListener('ended', showDefault);
document.addEventListener('keydown', videoHotKeys, false);


let startIndex = 0;

let videoSliderSection = document.querySelector('.video-slider')
videoSliderSection.addEventListener('click', changeMainVideo);

// function getYTFrames() {
//   let ytVideos = document.querySelectorAll('.yt-iframe');
//   ytVideos.forEach(ytvid => {
//     // let temp = ytvid.getAttribute('src')
//     // ytvid.setAttribute('src', '');
//     // ytvid.setAttribute('src', temp);
//   });
// }


// // 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('yt-video', {
//     height: '360',
//     width: '640',
//     videoId: 'zp1BXPX8jcU',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }