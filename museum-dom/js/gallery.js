//randomize on page reload 

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    let temp;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

let pictures = document.querySelectorAll('.gallery-element');
let index = [];

for (let i = 0; i < pictures.length; i++) {
    index[i] = pictures[i].src;
}
index = shuffle(index);
for (let i = 0; i < pictures.length; i++) {
    pictures[i].src = index[i];
}


//smooth fade-in

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkSlide(e) {
    pictures.forEach(picture => {
        let picPosition = (window.scrollY + window.innerHeight);
        let slidePositon = document.querySelector('.gallery.section').offsetTop + picture.offsetTop + picture.height / 10;
        if (picPosition > slidePositon) {
            picture.classList.add('gallery-slide');
        } else {
            picture.classList.remove('gallery-slide');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));