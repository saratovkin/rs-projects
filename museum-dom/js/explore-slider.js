function exploreSlide() {
    let width = document.getElementById('explore-slider');
    let foreground = document.getElementById('explore-foreground');
    let thumb = document.getElementById('explore-thumb');
    if (width.value < 1) {
        foreground.style.width = '2%';
        thumb.style.left = '0%';
    } else {
        if (width.value >= 96) {
            foreground.style.width = '97%';
            thumb.style.left = '94.5%';
        } else {
            foreground.style.width = `${+width.value + 2}%`;
            thumb.style.left = `${width.value}%`;
        }
    }
} 
