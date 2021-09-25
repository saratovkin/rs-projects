function exploreSlide() {
    let width = document.getElementById('explore-slider');
    let foreground = document.getElementById('explore-foreground');
    foreground.style.width = `${width.value * 7.2}px`;
}
