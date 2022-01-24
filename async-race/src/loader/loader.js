class Loader {
  baseUrl = 'http://127.0.0.1:3000';

  async getData(url) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`);
      if (response.ok) {
        return await response.json();
      }
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
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      return null;
    }
  }

  async deleteData(url) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return await response.json();
      }
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
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      return null;
    }
  }

  async patchData(url, id, status, raceId) {
    try {
      const qParam = { id, status };
      const path = new URL(`${this.baseUrl}${url}`);
      path.search = new URLSearchParams(qParam).toString();
      const response = await fetch(path, {
        method: 'PATCH',
      });
      if (response.ok) {
        const res = await response.json();
        res.raceId = raceId;
        return res;
      }
      return { status: response.status, raceId: raceId };
    }
    catch (e) {
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

  toggleEngine(id, status, raceId) {
    return this.patchData('/engine', id, status, raceId);
  }

  toggleDriveMode(id, raceId) {
    return this.patchData('/engine', id, 'drive', raceId);
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
