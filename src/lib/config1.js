/**
 * Created by 李康飞 on 2017/9/28.
 */
export const CACHE_PREFIX = "fyyy_pat_" + window.version + "_";
export const API_URL = {
  "localhost": {
    api: "//api.ywfyhospital.com/app",
    // api: "//test-api-ywfy.hztywl.cn/app",
    appid: "wx7d475d39a1ea1aa9",
    plat: 'dev'
  },
  "wechat.ywfyhospital.com": {
    api: "//api.ywfyhospital.com/app",
    // api: "//test-api-ywfy.hztywl.cn/app",
    appid: "wx7d475d39a1ea1aa9",
    plat: "pro"
  },
  "test-zheer-wx.hztywl.cn": {
    // api: "//api.ywfyhospital.com/app",
    api: "//test-api-ywfy.hztywl.cn/app",
    // api: "//test-api-ywfy.hztywl.cn/app",
    appid: "wx7d475d39a1ea1aa9",
    plat: "pro"
  },
}
export const DOWNLOAD = {
  ios: '',
  android: 'http://static.hztywl.cn/project/ywfyyy/pat.apk'
}

