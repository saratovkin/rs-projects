import AppController from '../controller/controller';
import Filter from './filter';
import IToy from '../interfaces/IToy';

class ToysPage {
  private controller: AppController;

  public data: IToy[];

  public constructor() {
    this.controller = new AppController();
    this.data = [];
  }

  public async initToysPage(): Promise<void> {
    this.data = await this.controller.getData();
    const filter = new Filter();
    filter.setData(this.data);
    filter.start();
  }
}

export default ToysPage;
