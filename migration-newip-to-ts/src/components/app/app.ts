import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import ISourcesArray from '../../interfaces/ISourcesArray';
import IArticlesArray from '../../interfaces/IArticlesArray';


class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(e, (data: IArticlesArray) => this.view.drawNews(data)));
        this.controller.getSources((data: ISourcesArray) => this.view.drawSources(data));
    }
}

export default App;
