import storage from "good-storage";
import config from "./config"

const HISTORY_CACHE_KEY = config.key_prefix + "history_";
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

const TOKEN_CACHE_KEY = config.key_prefix + "token_"
export const tokenCache = {
    get() {
        return storage.get(TOKEN_CACHE_KEY, null);
    },
    set(value) {
        storage.set(TOKEN_CACHE_KEY, value);
    }
}

const FROM_CACHE_KEY = config.key_prefix + "from_"
export const fromCache = {
    get() {
        return storage.session.get(FROM_CACHE_KEY, null);
    },
    set(value) {
        storage.session.set(FROM_CACHE_KEY, value);
    }
}