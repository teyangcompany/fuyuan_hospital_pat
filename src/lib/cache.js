import storage from "good-storage";

const HISTORY_CACHE_KEY = "__history__";
export const historyCache = {
    get () {
        return storage.session.get(HISTORY_CACHE_KEY, []);
    },
    set (value) {
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