class Loader {

  baseUrl = 'http://127.0.0.1:3000';

  // TODO merge all request methods into one

  async getData(url) {
    const res = await fetch(`${this.baseUrl}${url}`);
    if (!res.ok) {
      throw new Error(`url not found ${url}`)
    }
    const data = await res.json();
    return data;
  }

  async postData(url, content) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content),
    });
    return await response.json();
  }

  async deleteData(url) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  async putData(url, content) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content),
    });
    return await response.json();
  }

  getAllCars() {
    return this.getData('/garage');
  }

  getCarById(id) {
    return this.getData(`/garage/${id}`);
  }

  createCar(name, color) {
    return this.postData('/garage', { name: name, color: color });
  }

  deleteCar(id) {
    return this.deleteData(`/garage/${id}`);;
  }

  updateCar(id, name, color) {
    console.log(id, name, color);
    return this.putData(`/garage/${id}`, { name: name, color: color });
  }

  getAllWinners() {
    return this.getData('/winners');;
  }

  getWinnerById(id) {
    return this.getData(`/winners/${id}`);;
  }
}

export default Loader;