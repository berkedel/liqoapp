import store from 'react-native-simple-store';

const TOKEN_KEY = '@Store:token';

export class AuthToken {
  /**
   * ## AuthToken
   *
   * set the key from the config
   */
  constructor() {
    this.SESSION_TOKEN_KEY = TOKEN_KEY;
  }

  /**
   * ### storeSessionToken
   * Store the session key
   */
  storeSessionToken(sessionToken) {
    return store.save(this.SESSION_TOKEN_KEY, sessionToken);
  }

  /**
   * ### getSessionToken
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {
    if (sessionToken) {
      return store.save(this.SESSION_TOKEN_KEY, sessionToken)
        .then(() => store.get(this.SESSION_TOKEN_KEY));
    }
    return store.get(this.SESSION_TOKEN_KEY);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return store.delete(this.SESSION_TOKEN_KEY);
  }
}

// The singleton variable
export const authToken = new AuthToken();
