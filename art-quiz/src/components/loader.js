class Loader {
  constructor(url) {
    this.url = url;
  }

  async getImageData() {
    try {
      const res = await fetch(this.url);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log('an error has occurred');
      return null;
    }
  }
}

export default Loader;
