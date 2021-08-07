import {HOST} from './config';

export default class API {
  static instance = new API();

  server_host = HOST;
  //server_port = PORT;
  base_url_server = `http://${HOST}`;

  checkAuth = async () => {
    try {
      let req = await fetch(`${this.base_url_server}/checkAuth.do`);
      if (req.status === 500) {
        return req.headers.map['x-error-message'];
      } else if (req.status === 200) {
        let json = await req.json();
        return json;
      }
    } catch (error) {
      console.log('API dashboard error:', error);
      throw Error(error);
    }
  };

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

  logout = async () => {
    try {
      let req = await fetch(`${this.base_url_server}/logout.do`, {
        method: 'POST',
      });
      if (req.status === 500) {
        return req.headers.map['x-error-message'];
      } else if (req.status === 200) {
        return 'Des-logeado';
      }
    } catch (error) {
      console.log('API logout error:', error);
      throw Error(error);
    }
  };

  dashboard = async () => {
    if ((await this.checkAuth()) != null) {
      try {
        let req = await fetch(`${this.base_url_server}/getWidgets.do`);
        if (req.status === 500) {
          return req.headers.map['x-error-message'];
        } else if (req.status === 200) {
          let json = await req.json();
          return json;
        }
      } catch (error) {
        console.log('API dashboard error:', error);
        throw Error(error);
      }
    }
  };
}
