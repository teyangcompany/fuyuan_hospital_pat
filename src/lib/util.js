import config from "./config"

export function makeRandom(length) {
  let str = "0123456789", ret = "";
  for (let i = 0; i < length; i++) {
    ret += str.substr(Math.floor(Math.random() * str.length), 1);
  }
  return ret;
}

export function arrayFind(array, fn) {
  let index = array.findIndex(fn);
  return index > -1 ? array[index] : null;
}

export function getConsultStatusText(status) {
  let c = arrayFind(config.consult_status, (res) => {
    return res.status == status
  });
  return c ? c.name : "暂无";
}

export function getBookOrderStatusText(status) {
  return arrayFind(config.book_order_status, (res) => {
    return res.status == status
  }).name
}

