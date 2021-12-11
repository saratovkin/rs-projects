import DataLoader from './dataLoader';

class AppController extends DataLoader {
  
  public getData(callback: (data: any) => void) {
    super.load(callback);
  }

}

export default AppController;