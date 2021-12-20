import Loader from './loader';

class DataLoader extends Loader {
  public constructor() {
    super('https://raw.githubusercontent.com/saratovkin/art-quiz-json/main/decorations.json');
  }
}

export default DataLoader;
