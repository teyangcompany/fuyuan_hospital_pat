import api from "./http"
import {debug} from "./util";
import config from "./config"

export const mainHeightMixin = {
  mounted() {
    let h = 0;
    if (this.$refs.footer) {
      h += 60;
    }
    if (this.$refs.header) {
      h += 45;
    }
    if (this.$refs.main) {
      this.$refs.main.style.height = `${window.innerHeight - h}px`;
    }
  }
}

/**判断是openid否绑定,后续继续扩展
 * 获得认证状态
 * **/
export const isBindMixin = {
  data() {
    return {}
  },
  methods: {
    _isBind() {
      return api("smarthos.user.pat.get").then((res) => {
        debug("用户信息", res);
        if (res.code == 0) {
          return res.obj;
        } else {
          return false
        }
      })
    }
  }
}
/* *
*jssdk
* */
export const jssdkMixin = {
  data() {
    return {
      jssdkConfig: null
    }
  },
  created() {
    this._wxConfig();
  },
  methods: {
    _wxConfig() {
      let ret = this._getJSSDK();
      if (ret && ret.appId) {
        wx.config(ret);
      } else {
        ret.then((res) => {
          wx.config(res);
        })
      }
    },
    _getJSSDK() {
      if (this.jssdkConfig) {
        return this.jssdkConfig
      }
      return api("smarthos.wechat.jsapiticket.get", {
        appid: config.appid,
        reqUrl: location.href.substr(0, location.href.indexOf("#"))
      }).then((res) => {
        if (res.code == 0) {
          this.jssdkConfig = res.obj;
          return res.obj;
        } else {
          return false
        }
      })
    }
  }
}
