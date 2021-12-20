class MiscFunctions {
  static getRandomNum(max) {
    return Math.floor(Math.random() * max);
  }

  static shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    let temp;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  static getImageURL(index) {
    return `https://raw.githubusercontent.com/irinainina/image-data/master/img/${index}.jpg`;
  }
}

export default MiscFunctions;
