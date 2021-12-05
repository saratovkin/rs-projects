import AppLoader from './appLoader';
import ISourcesArray from '../../interfaces/ISourcesArray';
import IArticlesArray from '../../interfaces/IArticlesArray';

class AppController extends AppLoader {
    public getSources(callback: (data: ISourcesArray | IArticlesArray) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: {},
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: ISourcesArray | IArticlesArray) => void): void {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;