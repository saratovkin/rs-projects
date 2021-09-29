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