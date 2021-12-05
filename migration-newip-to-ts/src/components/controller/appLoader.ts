import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'c422559746fd4bea8cd0c5c4acecb484',
        });
    }
}

export default AppLoader;