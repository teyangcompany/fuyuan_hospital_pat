import {API_URL} from './config1'

export function makeRandom(length) {
  let str = "0123456789", ret = "";
  for (let i = 0; i < length; i++) {
    ret += str.substr(Math.floor(Math.random() * str.length), 1);
  }
  return ret;
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
    api_url = API_URL[Object.keys(config.api_url)[0]].appid;
  }
  return api_url;
}
