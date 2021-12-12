import AppController from '../controller/controller';
import AppView from '../view/appView';




function toggle(arr: any[], item: any) {
    if (!arr.includes(item)) {
        arr.push(item);
    } else {
        arr.splice(arr.indexOf(item), 1);
    }
    return arr;
}

// interface ICondition {
//     shape: string[];
//     color: string[];
//     size: string[];
//     isFav: boolean;
// }

class App {
    private controller: AppController;
    private view: AppView;
    public data: any[];

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public async start() {
        this.data = await this.controller.getData();
        this.view.draw(this.data);
        await this.view.showFilters();
        this.initFilter();
    }

    public filter(type: string, e: any) {
        const param = e.target.getAttribute('filter');
        let filtered;
        if (param) {
            e.target.classList.toggle('clicked');
            if (param === 'false' || param === 'true') {
                if (param === 'true') {
                    e.target.setAttribute('filter', 'false');
                    filtered = this.data;
                } else {
                    e.target.setAttribute('filter', 'true');
                    filtered = this.data.filter(word => word[type] == Boolean(param));
                }
            } else {
                filtered = this.data.filter(word => word[type] == param);
            }
            this.view.clear();
            this.view.draw(filtered);
        }
    }

    public initFilter() {
        document.querySelector('.shape-filters').
            addEventListener('click', (e) => this.filter('shape', e));
        document.querySelector('.color-filters').
            addEventListener('click', (e) => this.filter('color', e));
        document.querySelector('.size-filters').
            addEventListener('click', (e) => this.filter('size', e));
        document.querySelector('.fav-filters').
            addEventListener('click', (e) => this.filter('favorite', e));
    }
}

export default App;