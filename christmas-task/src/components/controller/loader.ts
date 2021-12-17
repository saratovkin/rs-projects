import IToy from '../interfaces/IToy';

class Loader {
    private link: string;

    public constructor(link: string) {
        this.link = link;
    }

    public load() {
        return fetch(this.link)
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;