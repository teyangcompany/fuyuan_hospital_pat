export function makeRandom(length) {
  let str = "0123456789", ret = "";
  for (let i = 0; i < length; i++) {
    ret += str.substr(Math.floor(Math.random() * str.length), 1);
  }
  return ret;
}
