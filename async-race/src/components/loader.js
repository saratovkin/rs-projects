class Loader {

  static getUrl(path) {
    return 'http://127.0.0.1:3000/' + path;
  }

  static load(method, path, callback) {
    fetch(Loader.getUrl(path), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }

}

export default Loader;