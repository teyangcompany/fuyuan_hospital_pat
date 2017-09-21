import config from "./config"

/**
 * 生成指定长度随机数
 * @param length
 * @returns {string}
 */
export function makeRandom(length) {
  let str = "0123456789", ret = "";
  for (let i = 0; i < length; i++) {
    ret += str.substr(Math.floor(Math.random() * str.length), 1);
  }
  return ret;
}

/**
 * 根据条件返回数组指定元素
 * @param array
 * @param fn
 * @returns {null}
 */
export function arrayFind(array, fn) {
  let index = array.findIndex(fn);
  return index > -1 ? array[index] : null;
}

/**
 * 获得咨询状态
 * @param status
 * @returns {string}
 */
export function getConsultStatusText(status) {
  let c = arrayFind(config.consult_status, (res) => {
    return res.status == status
  });
  return c ? c.name : "暂无";
}

/**
 * 获得订单状态
 * @param status
 */
export function getBookOrderStatusText(status) {
  return arrayFind(config.book_order_status, (res) => {
    return res.status == status
  }).name
}

/**
 * 判断浏览器类型
 * @param name
 * iphone
 * android
 * micromessenger
 * @returns {boolean}
 */
export function isBrower(name) {
  let UA = window.navigator.userAgent.toLowerCase();
  return UA.indexOf(name) > -1;
}
