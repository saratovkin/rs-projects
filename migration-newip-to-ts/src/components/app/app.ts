import AppController from '../controller/controller';
import AppView from '../view/appView';
import ISourcesArray from '../../interfaces/ISourcesArray';
import IArticlesArray from '../../interfaces/IArticlesArray';


class App {
    private controller: AppController;
    private view: AppView;
    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(e, (data: IArticlesArray) => this.view.drawNews(data)));
        this.controller.getSources((data: ISourcesArray) => this.view.drawSources(data));
    }
}

export default App;