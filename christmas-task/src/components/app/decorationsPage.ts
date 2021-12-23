import AppController from '../controller/controller';
import Filter from './filter';
import IToy from '../interfaces/IToy';
import ToysView from '../view/toysView';
import TreeView from '../view/treeView';

class decorationsPage {
  private controller: AppController;

  public data: IToy[];

  public constructor() {
    this.controller = new AppController();
    this.data = [];
  }

  public async start(): Promise<void> {
    this.data = await this.controller.getData();
    const filter = new Filter();
    const toys = new ToysView(this.data);
    toys.showToys();
    TreeView.initBtns();
    filter.setData(this.data);
    filter.start();
  }
}

export default decorationsPage;
