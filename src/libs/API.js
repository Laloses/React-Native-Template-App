import {HOST} from './config';

export default class API {
  static instance = new API();

  server_host = HOST;
  //server_port = PORT;
  base_url_server = `http://${HOST}`;

  login = async (user, pass) => {
    try {
      let res = null;
      let req = await fetch(`${this.base_url_server}/login.do`, {
        method: 'POST',
        body: JSON.stringify({
          User: user,
          Password: pass,
        }),
      });
      req.status === 200
        ? (res = await req.json())
        : (res = Promise.reject(req.headers.map['x-error-message']));
      return res;
    } catch (error) {
      console.log('API login error:', error);
      throw Error(error);
    }
  };

  logout = async () => {
    try {
      let res = null;
      let req = await fetch(`${this.base_url_server}/logout.do`);
      req.status === 200
        ? (res = 'Des-logeado')
        : (res = Promise.reject(req.headers.map['x-error-message']));
      return res;
    } catch (error) {
      console.log('API logout error:', error);
      throw Error(error);
    }
  };

  //Esta verificacion se pone a todas las consultas a exepcion de login y logout
  checkAuth = async () => {
    try {
      let res = null;
      let req = await fetch(`${this.base_url_server}/checkAuth.do`);
      req.status === 200
        ? (res = await req.json())
        : (res = Promise.reject(req.headers.map['x-error-message']));
      return res;
    } catch (error) {
      console.log('API dashboard error:', error);
      throw Error(error);
    }
  };

  dashboard = async () => {
    if ((await this.checkAuth()) != null) {
      try {
        let res = null;
        let req = await fetch(`${this.base_url_server}/getWidgets.do`);
        req.status === 200
          ? (res = await req.json())
          : (res = Promise.reject(req.headers.map['x-error-message']));
        return res;
      } catch (error) {
        console.log('API dashboard error:', error);
        throw Error(error);
      }
    }
  };

  getUserPhoto = async UserId => {
    try {
      let res = null;
      let req = {
        status: 500,
        headers: {
          map: {'x-error-message': 'Aún no implementado'},
        },
      };
      // let req = await fetch(`${this.base_url_server}/getUserPhoto.do`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     UserId: UserId,
      //   }),
      // });
      req.status === 200
        ? (res = await req.json())
        : (res = Promise.reject(req.headers.map['x-error-message']));
      return res;
    } catch (error) {
      console.log('API login error:', error);
      throw Error(error);
    }
  };

  getMapUserData = async () => {
    if ((await this.checkAuth()) != null) {
      try {
        let res = null;
        //let req = await fetch(`${this.base_url_server}/getWidgets.do`);
        let req = {
          status: 200,
          headers: {
            map: {'x-error-message': 'Aún no implementado'},
          },
        };
        req.status === 200
          ? (res = [
              {
                source: {
                  id: 3,
                  name: 'C',
                },
                target: {
                  id: 11,
                  name: 'K',
                },
              },
            ]) //await req.json()
          : (res = Promise.reject(req.headers.map['x-error-message']));
        return res;
      } catch (error) {
        console.log('API dashboard error:', error);
        throw Error(error);
      }
    }
  };
}
