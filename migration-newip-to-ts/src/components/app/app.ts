import AppController from '../controller/controller';
import { AppView } from '../view/appView';


interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

interface ISourceArray {
    status: string;
    sources: ISource[];
}

interface IArticle {
    source: { id: string, name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface IAtricleArray {
    status: string;
    totalResults: number;
    articles: IArticle[];
}


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
            .addEventListener('click', (e) => this.controller.getNews(e, (data:IAtricleArray) => this.view.drawNews(data)));
        this.controller.getSources((data:ISourceArray) => this.view.drawSources(data));
    }
}

export default App;
