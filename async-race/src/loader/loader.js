class Loader {
  baseUrl = 'http://127.0.0.1:3000';

  // TODO merge all request methods into one

  async getData(url) {
    try {
      const res = await fetch(`${this.baseUrl}${url}`);
      if (!res.ok) {
        throw new Error(`url not found ${url}`);
      }
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  async postData(url, content) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async deleteData(url) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async putData(url, content) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async patchData(url, id, status) {
    try {
      const qParam = { id, status };
      const path = new URL(`${this.baseUrl}${url}`);
      path.search = new URLSearchParams(qParam).toString();
      const response = await fetch(path, {
        method: 'PATCH',
      });
      return response.ok ? await response.json() : '';
    } catch (e) {
      return null;
    }
  }

  getAllCars() {
    return this.getData('/garage');
  }

  getCarById(id) {
    return this.getData(`/garage/${id}`);
  }

  createCar(name, color) {
    return this.postData('/garage', { name, color });
  }

  deleteCar(id) {
    return this.deleteData(`/garage/${id}`);
  }

  updateCar(id, name, color) {
    return this.putData(`/garage/${id}`, { name, color });
  }

  toggleEngine(id, status) {
    return this.patchData('/engine', id, status);
  }

  toggleDriveMode(id) {
    return this.patchData('/engine', id, 'drive');
  }

  getAllWinners() {
    return this.getData('/winners');
  }

  getWinnerById(id) {
    return this.getData(`/winners/${id}`);
  }

  createWinner(id, wins, time) {
    return this.postData('/winners', { id, wins, time });
  }

  deleteWinner(id) {
    return this.deleteData(`/winners/${id}`);
  }

  updateWinner(id, wins, time) {
    return this.putData(`/winners/${id}`, { wins, time });
  }
}

export default Loader;
