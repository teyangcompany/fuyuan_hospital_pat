/**
 * Created by 李康飞 on 2017/9/21.
 */
import api from './http'
import {getAppid} from "./util"
import {openidCache} from "./cache"
// const APPID = "wx6e3551dee5f7e716";
// const COMPONENT_APPID = "wxe24cab30ebb1e366";
// export default (cb)=>{
//     let href = location.href;
//   console.log(href,55555)
//   let redirect_url = encodeURIComponent(href);
//   let jumpTo = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=${COMPONENT_APPID}#wechat_redirect`;
//   let openId = localStorage.getItem('openId')
//   let query = url('?')
//   let hash = url('#')
//   let UA = window.navigator.userAgent.toLocaleLowerCase();
//
//   if(/micromessenger/.test(UA)){
//       console.log('我是微信');
//       if(openId||(query&&(openId=query.openid))||(hash&&(openId=hash.openid))){
//           localStorage.setItem('openId',openId)
//       }else {
//           if(query&&query.code&&query.state){
//             console.log(query.code);
//             api('smarthos.wechat.user.get.bycode',{
//               code:query.code
//             }).then(res=>{
//               console.log(res,666);
//               if(res.code=0){
//                   return res.obj;
//                 localStorage.getItem('openId',res.obj.id);
//                 cd();
//               }else {
//                 alert('获取openid失败');
//
//               }
//             })
//           }else {
//             location.href = jumpTo
//           }
//       }
//   }else {
//     cb()
//   }
// }

  export default (cb) => {
    // .replace()
    let href = location.href;
    let redirect_uri = encodeURIComponent(href);

    let query = url("?"), hash = url("#");
    let UA = window.navigator.userAgent.toLocaleLowerCase();

    /*微信打开*/
    if (/micromessenger/.test(UA)) {
      /*本地有openid*/
      let openid = openidCache.get() || (query && query.openid) || (hash && hash.openid) || null;
      console.log(openid,6666)
      if (openid) {
        openidCache.set(openid);
        cb();
      }
      /*本地无openid*/
      else {
        let callback = location.href;
        let APPID = getAppid();
        callback = encodeURIComponent(callback);
        location.replace(`http://test-zheer-wx.hztywl.cn/dev_oauth2/?appid=${APPID}&callback=${callback}`);
      }
    }
    /*非微信打开*/
    else {
      cb();
    }
  }
