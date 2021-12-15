import AppController from '../controller/controller';
import Filter from './filter';


class decorationsPage {
    private controller: AppController;
    private filter: Filter;

    public data: any[];

    public constructor() {
        this.controller = new AppController();
    }

    public async start() {
        this.data = await this.controller.getData();
        this.filter = new Filter(this.data);
        this.filter.start();
    }

}

export default decorationsPage; 