/**
 * Created by Administrator on 2017/10/10 0001.
 */
import axios from "axios";
import {openidCache} from './cache'
import {getApiUrl,getEnv} from "./util"
import  config  from './config'


// let url = "http://test-zsyy-fep.hztywl.cn:6060/api";
let spid = "1101";
let random = "";
for (let i = 0; i < 4; i++) {
  random += "1234567890".substr(Math.floor(Math.random() * 10), 1);
}

let base = config.base_params;




export default function (service, options) {

  // if (typeof options.showloading == "undefined") {
  //   options.showloading = true;
  // }
  // if (options.showloading) {
  //   bus.$emit("loading", {status: 'start'});
  // }
  let obj = {...base,service,...options};
  // let sign = hex_md5(hex_md5('aAr9MVS9j1') + JSON.stringify(obj));
  let openid = openidCache.get()
  if(openid){
    obj.token = 'OPENID_PAT_'+ openid
  }

  // let sign = hex_md5(hex_md5("aAr9MVS9j1") + JSON.stringify(obj));
  let config = {
    headers: {
      "Content-Type": "application/json",
      "sign": 'test',
    },
  }
  let url = getEnv().api;
  console.log(url)
  return axios.post(url, obj, config)
    .then((res) => {
      // bus.$emit("loading", {status: 'stop'});
      if (res.status == 200) {
        return res.data;

      } else {
        return res;

      }
    });
}


