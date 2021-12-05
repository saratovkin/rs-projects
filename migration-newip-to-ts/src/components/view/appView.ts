import News from './news/news';
import Sources from './sources/sources';
import ISourcesArray from '../../interfaces/ISourcesArray';
import IArticlesArray from '../../interfaces/IArticlesArray';
import IArticle from '../../interfaces/IArticle';
import ISource from '../../interfaces/ISource';


class AppView {
    private news: News;
    private sources: Sources;
    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IArticlesArray): void {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourcesArray): void {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;