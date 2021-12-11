class Loader {
    private link: string;
    
    public constructor(link: string) {
        this.link = link;
    }

    public load(callback: (data:any) => void): void {
        fetch(this.link)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;