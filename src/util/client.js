import _ from 'lodash';
import { authToken } from './authToken';

export class Client {

  constructor() {
    this.API_BASE_URL = 'https://liqo.herokuapp.com/api';
    authToken.getSessionToken()
      .then((token) => {
        this.sessionToken = token;
      });
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
      const token = _.replace(res.headers.authorization, 'Bearer ', '');
      this.sessionToken = token;
      authToken.storeSessionToken(token);
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
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * {"id":"xxxxxxxxx",
   *  "username":"test",
   *  "groups":["xxxxxxxx"],
   *  "session":{
   *   "issued_at":1475418089,
   *   "expired_at":1475504489
   *  }
   * }
   */
  async getProfile() {
    return await this.fetch({
      method: 'GET',
      url: '/user',
    })
      .then(res => res)
      .catch((error) => {
        throw (error);
      });
  }

  async getGroupDetails(id) {
    return await this.fetch({
      method: 'GET',
      url: `/groups/${id}`,
    })
      .then(res => res)
      .catch((error) => {
        throw (error);
      });
  }

  /**
   * ### getIbadahList
   * Get all ibadahs
   *
   * @returns
   *
   * [
   *  {"_id":"aaa","group_id":"111","name":"rrr","type":"hh","target":"yy","unit_name":"ww"},
   *  {"_id":"bbb","group_id":"222","name":"sss","type":"hh","target":"yy","unit_name":"ww"},
   *  {"_id":"ccc","group_id":"333","name":"ttt","type":"hh","target":"yy","unit_name":"ww"},
   *  {"_id":"ddd","group_id":"444","name":"uuu","type":"ii","target":"xx"},
   *  {"_id":"eee","group_id":"555","name":"vvv","type":"ii","target":"xx"},
   *  {"_id":"fff","group_id":"666","name":"www","type":"ii","target":"xx"},
   *  {"_id":"ggg","group_id":"777","name":"zzz","type":"ii","target":"xx"}]
   */
  async getIbadahList() {
    return await this.fetch({
      method: 'GET',
      url: '/ibadahs',
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

    if (!_.isNull(this.sessionToken)) {
      reqOpts.headers.Authorization = `Bearer ${this.sessionToken}`;
    }

    reqOpts.headers['Content-Type'] = 'application/json';

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
