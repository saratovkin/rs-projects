function findVideos() {
  let videos = document.querySelectorAll('.video-slider-item');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video-link');
  let media = video.querySelector('.video-preview');
  let button = video.querySelector('.video-slider-play');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]+)\/0\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);
  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video-preview');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
