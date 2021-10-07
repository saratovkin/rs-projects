
// function changeCurrentItem(n) {
//   currentVideo = (n + sliderVideos.length) % sliderVideos.length;
// }

// function hideItem(direction) {
//   isPossible = false;
//   sliderVideos[currentVideo].classList.add(direction);
//   sliderVideos[currentVideo].addEventListener('animationend', function () {
//       this.classList.remove('active', direction);
//   });

// }

// function showItem(direction) {
//   sliderVideos[currentVideo].classList.add('next', direction);
//   sliderVideos[currentVideo].addEventListener('animationend', function () {
//       this.classList.remove('next', direction);
//       this.classList.add('active');
//       isPossible = true;
//   });
// }

// function previousItem(n) {
//   hideItem('to-right');
//   currentVideo(n - 1);
//   showItem('from-left');
// }

// function nextItem(n) {
//   hideItem('to-left');
//   changeCurrentItem(n + 1);
//   showItem('from-right');
// }


// let currentVideo = 0;
// let isPossible = true;
// let sliderVideos = document.querySelectorAll('.video-slider-item');
