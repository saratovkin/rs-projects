function progressBar() {
    let progress = document.getElementById('progress-bar');
    let displayProgress = document.getElementById('bar-sub');
    displayProgress.style.width = `${progress.value}%`;
}

function volumeBar() {
    let volume = document.getElementById('volume-bar');
    let volumeRange = document.getElementById('volume-sub');
    volumeRange.style.width = `${volume.value}%`;
}
