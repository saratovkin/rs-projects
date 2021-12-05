import ISourcesArray from '../../interfaces/ISourcesArray';
import IArticlesArray from '../../interfaces/IArticlesArray';

interface IRes {
    ok: boolean;
    status: number;
    statusText: string;
    json: () => Promise<IArticlesArray>;
}

interface IOptions {
    [key: string]: string;
}

interface IResp {
    endpoint: string;
    options: object;
}

class Loader {
    private baseLink: string;
    private options: object;
    public constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: IResp,
        callback = (data: ISourcesArray | IArticlesArray) => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: IRes): IRes {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: IOptions, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: (data: IArticlesArray) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;