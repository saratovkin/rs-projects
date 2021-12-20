import IToy from '../interfaces/IToy';

class Loader {
  private link: string;

  public constructor(link: string) {
    this.link = link;
  }

  public async load(): Promise<IToy[] | void> {
    try {
      const res = await fetch(this.link);
      const data = await res.json();
      return (data as IToy[]);
    } catch (err) {
      return console.error(err);
    }
  }
}

export default Loader;
