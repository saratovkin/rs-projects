export default class MiscFunctions {
  getRandomNum(max) {
    return Math.floor(Math.random() * max);
  }
  shuffle(array) {
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
  getImageURL(index) {
    return `https://raw.githubusercontent.com/irinainina/image-data/master/img/${index}.jpg`;
  }
}