class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  addCardInfo({ name, link }) {
    return post("${this.baseUrl}/cards", {
      method: POST,
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`${res.status}`);
      }
    });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`${res.status}`);
      }
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`${res.status}`);
      }
    });
  }

  editAvatarInfo({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`${res.status}`);
      }
    });
  }
}

// export the class

export default Api;
