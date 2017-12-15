import {API_URL} from './config1'

export function makeRandom(length) {
  let str = "0123456789", ret = "";
  for (let i = 0; i < length; i++) {
    ret += str.substr(Math.floor(Math.random() * str.length), 1);
  }
  return ret;
}

/**
 * 获得api_url
 * @param callback
 * @returns {string}
 */
export function getApiUrl() {
  let hostname = url("hostname");
  let api_url = "";
  for (let key in API_URL) {
    if (hostname == key) {
      api_url = API_URL[key].api;
    }
  }
  if (!api_url) {
    api_url = API_URL[Object.keys(API_URL)[0]].api;
  }
  return api_url;
}


export function getAppid() {
  let hostname = url("hostname");
  let api_url = "";
  for (let key in API_URL) {
    if (hostname == key) {
      api_url = API_URL[key].appid;
    }
  }
  if (!api_url) {
    api_url = API_URL[Object.keys(API_URL)[0]].appid;
  }
  return api_url;
}

/**
 * 生成返回URL
 * @param options
 * @returns {string}
 */
export function makeUrl(options) {
  let url = "";
  if (options.protocol) {
    url += options.protocol + "://"
  }
  if (options.hostname) {
    url += options.hostname
  }
  if (options.port && options.port != 80 && options.port != 443) {
    url += options.port
  }
  if (options.path) {
    url += options.path
  }
  if (options.query) {
    let q = "";
    for (let key in options.query) {
      if (options.query[key]) {
        q += `&${key}=${options.query[key]}`
      } else {
        q += `&${key}`
      }

    }
    q = q.substr(1);
    url += "?" + q
  }
  if (options.hash) {
    url += "#" + options.hash;
  }
  return url;
}

/**
 * 解析url参数
 * @param from
 * @returns {{protocol: *, hostname: *, port: *, path: *, query: *, hash: *}}
 */
export function getParamsFromUrl(from) {
  let protocol = url("protocol", from);
  let hostname = url("hostname", from);
  let port = url("port", from);
  let path = url("path", from);
  let query = url("?", from);
  let hash = url("hash", from);
  return {protocol, hostname, port, path, query, hash}
}

/**
 * 获得sharelink
 * @param link
 * @returns {string}
 */
export function getShareLink(link) {
  let opt = getParamsFromUrl(link)
  if (opt.query) {
    opt.query.comefrom = "share"
  } else {
    opt.query = {comefrom: "share"}
  }
  return makeUrl(opt);
}

/**
 * 控制台输出
 * @param args
 */
export function debug(...args) {
  console.log.apply(console, args);
}
