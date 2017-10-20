import storage from "good-storage";
import {CACHE_PREFIX} from "./config1"

const HISTORY_CACHE_KEY = "__history__";
const OPENID_KEY = CACHE_PREFIX + "openid_";
export const openidCache = {
  get() {
    return storage.get(OPENID_KEY, null);
  },
  set(value) {
    storage.set(OPENID_KEY, value);
  }
}

const TOKEN_KEY = CACHE_PREFIX + "token_";
export const tokenCache = {
  get() {
    return storage.get(TOKEN_KEY, null);
  },
  set(value) {
    storage.set(TOKEN_KEY, value);
  }
}

const WX_USER_KEY = CACHE_PREFIX + "user_";
export const userCache = {
  get() {
    return storage.get(WX_USER_KEY, null);
  },
  set(value) {
    storage.set(WX_USER_KEY, value);
  }
}
export const historyCache = {
  get() {
    return storage.session.get(HISTORY_CACHE_KEY, []);
  },
  set(value) {
    storage.session.set(HISTORY_CACHE_KEY, value);
  },
  inHistory(value) {
    return this.get().findIndex((his) => {
      return his === value;
    });
  },
  clear() {
    storage.session.remove(HISTORY_CACHE_KEY);
  }
}
