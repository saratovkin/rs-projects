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

interface ICondition {
    shape: string[];
    color: string[];
    size: string[];
    favorite: string;
}

class App {
    private controller: AppController;
    private view: AppView;
    public data: any[];

    private condition: ICondition;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.condition = {
            // shape: ['шар', 'фигурка', 'колокольчик', 'шишка', 'снежинка'],
            // color: ['желтый', 'зелёный', 'красный', 'белый', 'синий'],
            // size: ['малый', 'средний', 'большой'],
            shape: [],
            color: [],
            size: [],
            favorite: 'false',
        }
    }

    public async start() {
        this.data = await this.controller.getData();
        this.view.draw(this.data);
        await this.view.showFilters();
        this.initFilter();
    }

    private updateCondition(type: string, param: string) {
        if (type === 'shape') {
            toggle(this.condition.shape, param);
        }
        if (type === 'color') {
            toggle(this.condition.color, param);
        }
        if (type === 'size') {
            toggle(this.condition.size, param);
        }
        if (type === 'favorite') {
            this.condition.favorite = param;
        }
    }

    private filterFunc(e: any) {
        let res = true;
        if (this.condition.shape.length != 0) {
            res = this.condition.shape.includes(e.shape);
            if (!res) {
                return false;
            }
        }
        if (this.condition.color.length != 0) {
            res = this.condition.color.includes(e.color);
            if (!res) {
                return false;
            }
        }
        if (this.condition.size.length != 0) {
            res = this.condition.size.includes(e.size);
            if (!res) {
                return false;
            }
        }
        return res;
    }

    public filter(type: string, e: any) {
        const param = e.target.getAttribute('filter');
        let filtered;
        if (param) {
            this.view.clear();
            this.updateCondition(type, param);
            e.target.classList.toggle('clicked');
            // filtered = this.data.filter((e) => {
            //     return this.condition.shape.includes(e.shape) &&
            //         this.condition.color.includes(e.color) &&
            //         this.condition.size.includes(e.size);
            // });
            filtered = this.data.filter(e => this.filterFunc(e));
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

        // if (param === 'false' || param === 'true') {
            //     if (param === 'true') {
            //         e.target.setAttribute('filter', 'false');
            //         filtered = this.data;
            //     } else {
            //         e.target.setAttribute('filter', 'true');
            //         filtered = this.data.filter(word => word[type] == Boolean(param));
            //     }
            // } else {
            //     filtered = this.data.filter(word => word[type] == param);
            // }
            // this.view.clear();
            // this.view.draw(filtered);