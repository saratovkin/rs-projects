function changeCurrentItem(n) {
    clearInterval(timer);
    currentItem = (n + items.length) % items.length;
    timer = setInterval(function () { nextItem(currentItem); }, 5000);
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    });

}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function previousItem(n) {
    indicators.item(currentItem).classList.remove('welcome-selected');
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
    currentIndex.textContent = '0' + (currentItem + 1);
    indicators.item(currentItem).classList.add('welcome-selected');
}

function nextItem(n) {
    indicators.item(currentItem).classList.remove('welcome-selected');
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
    currentIndex.textContent = '0' + (currentItem + 1);
    indicators.item(currentItem).classList.add('welcome-selected');
}

function jumpTo(n) {
    if (n > currentItem && isEnabled) {
        (nextItem(n - 1))
    } if (n < currentItem && isEnabled) {
        previousItem(n + 1);
    }
}

document.querySelector('.welcome-arrow.right').addEventListener('click', function () {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

document.querySelector('.welcome-arrow.left').addEventListener('click', function () {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

const swipeDetect = (el) => {

    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let threshold = 150;
    let restraint = 100;

    surface.addEventListener('mousedown', function (e) {
        startX = e.pageX;
        startY = e.pageY;
        e.preventDefault();
    });

    surface.addEventListener('mouseup', function (e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        if (Math.abs(distX) > threshold && Math.abs(distY) <= restraint) {
            if (distX > 0) {
                if (isEnabled) {
                    previousItem(currentItem);
                }
            } else {
                if (isEnabled) {
                    nextItem(currentItem);
                }
            }
        }
        e.preventDefault();
    });
}

let el = document.querySelector('.welcome');
swipeDetect(el);

let timer = setInterval(function () { nextItem(currentItem); }, 5000);
let currentItem = 0;
let isEnabled = true;
let items = document.querySelectorAll('.welcome-slider-item');
let currentIndex = document.getElementById('current');
let indicators = document.querySelectorAll('.welcome-indicator');
for (let i = 0; i < items.length; i++) {
    indicators[i].addEventListener('click', function () {
        jumpTo(i);
    });
}
