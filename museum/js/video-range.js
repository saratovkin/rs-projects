


function progressBar() {
    let progress = document.getElementById('progress-bar');
    let displayProgress = document.getElementById('bar-sub');
    displayProgress.style.width = `${progress.value * 9.3}px`;
}

function volumeBar() {
    let volume = document.getElementById('volume-bar');
    let volumeRange = document.getElementById('volume-sub');
    volumeRange.style.width = `${volume.value * 1.55}px`;
}
