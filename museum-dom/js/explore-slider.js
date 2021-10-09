function exploreSlide() {
    let width = document.getElementById('explore-slider');
    let foreground = document.getElementById('explore-foreground');
    let thumb = document.getElementById('explore-thumb');
    foreground.style.width = `${width.value}%`;
    if (width.value * 1.02 - 2 <= 98) {
        thumb.style.left = `${width.value * 1.02 - 2}%`;
    } else {
        thumb.style.left = `98%`;
    }

}
