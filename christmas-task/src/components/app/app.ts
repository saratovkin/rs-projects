import ToysPage from './toysPage';
import MainPage from './mainPage';

class App {
  private toysPage: ToysPage;

  private mainPage: MainPage;

  public constructor() {
    this.toysPage = new ToysPage();
    this.mainPage = new MainPage();
  }

  public start(): void {
    this.toysPage.initToysPage();
    this.mainPage.initNavigation();
  }
}

export default App;
