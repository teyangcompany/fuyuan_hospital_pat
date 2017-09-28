import storage from "good-storage"
import config from "./config"

class cache {
  constructor(key, session) {
    this.key = key;
    this.session = session ? true : false;
  }

  get() {
    if (this.session) {
      return storage.session.get(this.key, null);
    } else {
      return storage.get(this.key, null);
    }
  }

  set(value) {
    if (this.session) {
      storage.session.set(this.key, value);
    } else {
      storage.set(this.key, value);
    }
  }
}

let prefix = config.key_prefix + (window.version || "") + "_";

const HISTORY_CACHE_KEY = prefix + "history_";

class history extends cache {
  constructor(key, session) {
    super(key, session)
  }

  get() {
    if (this.session) {
      return storage.session.get(this.key, []);
    } else {
      return storage.get(this.key, []);
    }
  }

  inHistory(path) {
    let arr = this.get();
    return arr.findIndex((history) => {
      return history == path;
    })
  }

  clear() {
    if (this.session) {
      storage.session.remove(this.key);
    } else {
      storage.remove(this.key);
    }
  }
}

export const historyCache = new history(HISTORY_CACHE_KEY, true);

const TOKEN_CACHE_KEY = prefix + "token_"
export const tokenCache = new cache(TOKEN_CACHE_KEY)

const FROM_CACHE_KEY = prefix + "from_"
export const fromCache = new cache(FROM_CACHE_KEY, true)

const OPENID_CACHE_KEY = prefix + "openid_"
export const openidCache = new cache(OPENID_CACHE_KEY);
