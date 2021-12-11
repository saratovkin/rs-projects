import AppController from '../controller/controller';
import AppView from '../view/decorations';
import Filter from '../app/filter';


class App {
    private controller: AppController;
    private view: AppView;
    private filter: Filter;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.filter = new Filter();
    }

    public start(): void {
        this.controller.getData(this.view.draw);
    }
}

export default App;