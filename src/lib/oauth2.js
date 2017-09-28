import {openidCache} from "./cache"
import {isBrower} from "./util"

const APPID = "wxa49f90b4ff678ef2";
export default (cb) => {
  let query = url("?"), hash = url("#");
  /*微信打开*/
  if (isBrower("micromessenger")) {
    /*本地有openid*/
    let openid = openidCache.get() || (query && query.openid) || (hash && hash.openid) || null;
    if (openid) {
      openidCache.set(openid);
      cb();
    }
    /*本地无openid*/
    else {
      let callback = location.href;
      callback = encodeURIComponent(callback);
      location.replace(`http://test-zheer-wx.hztywl.cn/dev_oauth2/?appid=${APPID}&callback=${callback}`);
    }
  }
  /*非微信打开*/
  else {
    cb();
  }
}
