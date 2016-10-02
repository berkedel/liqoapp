import _ from 'lodash';

export class Client {

  constructor() {
    this.API_BASE_URL = 'https://liqo.herokuapp.com/api';
    this.sessionToken = null;
  }

  initialize(token) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing');
    }

    this.sessionToken = _.isNull(token) ? null : token.sessionToken.sessionToken;
  }

  /**
   * ### login
   * encode the data and and call fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns string:
   *  Done
   *
   */
  async login(data) {
    return await this.fetch({
      method: 'POST',
      url: '/auth',
      body: data,
    })
    .then((res) => {
      if (!_.isNull(res.headers.authorization)) {
        this.sessionToken = res.headers.authorization;
      }
      return res;
    })
    .catch((error) => {
      throw error;
    });
  }

  /**
   * ### signup
   *
   * @param data object
   *
   * {username: "barton", password: "Passw0rd!"}
   *
   * @return
   * if ok, 'Done'
   * otherwise, erorr message
   */
  async signup(data) {
    return await this.fetch({
      method: 'POST',
      url: '/users',
      body: data,
    })
    .then(res => res)
    .catch((error) => {
      throw (error);
    });
  }

  /**
   * ### fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  headers: response.headers.map,
   *  status: response.status,
   *  json: response.json() or text: response.text()
   */
  async fetch(params) {
    const opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null,
    }, params);

    const reqOpts = {
      method: opts.method,
      headers: {
      },
    };

    if (this.sessionToken) {
      reqOpts.headers.Authorization = `Bearer ${this.sessionToken}`;
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      // reqOpts.headers.Accept = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    const url = this.API_BASE_URL + opts.url;
    const res = {};

    const response = await fetch(url, reqOpts);
    res.status = response.status;
    res.headers = response.headers.map;

    const contentType = response.headers.get('content-type');
    if (!_.isNull(contentType) && contentType.indexOf('application/json') !== -1) {
      return response.json()
        .then((json) => {
          res.data = json;
          return res;
        })
        .catch(() => res);
    }

    return response.text()
      .then((text) => {
        res.data = text;
        return res;
      })
      .catch(() => res);
  }

}

export const client = new Client();
