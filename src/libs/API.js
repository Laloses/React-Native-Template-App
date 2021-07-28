import {HOST, PORT} from './config';

export default class API {
  static instance = new API();

  server_host = HOST;
  server_port = PORT;
  base_url_server = `http://${HOST}`;

  login = async (user, pass) => {
    try {
      let req = await fetch(`${this.base_url_server}/login.do`, {
        method: 'POST',
        body: JSON.stringify({
          User: user,
          Password: pass,
        }),
      });
      if (req.status === 500) {
        return req.headers.map['x-error-message'];
      } else if (req.status === 200) {
        let json = await req.json();
        return json;
      }
    } catch (error) {
      console.log('API login error:', error);
      throw Error(error);
    }
  };

  get = async url => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (error) {
      console.log('API get error:', error);
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = await req.json();
      return json;
    } catch (error) {
      console.log('API post error', error);
      throw Error(error);
    }
  };
}
