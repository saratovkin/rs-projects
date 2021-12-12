import DataLoader from './dataLoader';


class AppController extends DataLoader {

  private data:any[];

  public async getData() {
    this.data = await super.load();
    return this.data;
  }

}

export default AppController;