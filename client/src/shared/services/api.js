
import { token } from "./token";

export const API = {
  async get(URL) {
    const auth = token.getToken();
    const absoluteURL = process.env.REACT_APP_SERVER_URL + URL;
    const promise = await fetch(absoluteURL, {
      method: "GET",
      headers: { "Authorization": `Bearer ${auth}` },
    });
    return promise;
  },
  async post(URL, data) {
    const auth = token.getToken();
    const header = !auth
      ? {
          "Content-type": "application/json; charset=UTF-8",
        }
      : {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${auth}`,
        };
    const absoluteURL = process.env.REACT_APP_SERVER_URL + URL;
    const promise = await fetch(absoluteURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${auth}`,
      },
    });
    return promise;
  },
  async patch(URL, data){
    const auth = token.getToken();
    const header = !auth
      ? {
          "Content-type": "application/json; charset=UTF-8",
        }
      : {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${auth}`,
        };
    const absoluteURL = process.env.REACT_APP_SERVER_URL + URL;
    const promise = await fetch(absoluteURL, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${auth}`,
      },
    });
    return promise;
  },
  async delete(URL, data){
    const auth = token.getToken();
    const header = !auth
      ? {
          "Content-type": "application/json; charset=UTF-8",
        }
      : {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${auth}`,
        };
    const absoluteURL = process.env.REACT_APP_SERVER_URL + URL;
    const promise = await fetch(absoluteURL, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${auth}`,
      },
    });
    return promise;
  },
};
