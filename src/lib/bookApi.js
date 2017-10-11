/**
 * Created by Administrator on 2017/10/10 0001.
 */
import axios from "axios";
let url = "http://test-zsyy-fep.hztywl.cn:6060/api";
let spid = "1001";
let random = "";
for (let i = 0; i < 4; i++) {
  random += "1234567890".substr(Math.floor(Math.random() * 10), 1);
}



let base = {
  "channel": "3",
  "format": "JSON",
  "oper": "127.0.0.1",
  "random": "1234",
  // "sign": "test",
  "spid": "1101"
};


export default function (service, options) {

  // if (typeof options.showloading == "undefined") {
  //   options.showloading = true;
  // }
  // if (options.showloading) {
  //   bus.$emit("loading", {status: 'start'});
  // }
  let obj = {...base,service,...options};
  // let sign = hex_md5(hex_md5("aAr9MVS9j1") + JSON.stringify(obj));
  let config = {
    headers: {
      "Content-Type": "application/json",
      // "test":true
    },
  }

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


