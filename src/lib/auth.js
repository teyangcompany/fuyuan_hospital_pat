/**
 * Created by 李康飞 on 2017/9/21.
 */
import {openidCache} from "./cache"
import config from "./config"

export default (cb) => {
  // .replace()
  let query = url("?"), hash = url("#");
  let UA = window.navigator.userAgent.toLocaleLowerCase();
  /*微信打开*/
  if (/micromessenger/.test(UA)) {
    /*本地有openid*/
    let openid = openidCache.get() || (query && query.openid) || (hash && hash.openid) || null;
    if (openid) {
      openidCache.set(openid);
      cb();
    }
    /*本地无openid*/
    else {
      let href = location.href;
      let redirect_uri = encodeURIComponent(href);
      let APPID = config.appid;
      //alert(`http://test-zheer-wx.hztywl.cn/dev_oauth2/?appid=${APPID}&callback=${redirect_uri}`);
      location.replace(`http://test-zheer-wx.hztywl.cn/oauth2/?appid=${APPID}&callback=${redirect_uri}`);
    }
  }
  /*非微信打开*/
  else {
    cb();
  }
}
