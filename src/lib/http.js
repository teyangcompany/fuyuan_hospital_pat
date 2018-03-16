import axios from "axios";
import config from "./config"
import {getApiUrl,getEnv} from "./util"

import {openidCache} from './cache'

export default function (service, options) {
  let baseParams = config.base_params;

  let data = {
    service,
    ...baseParams,
    ...options
  };
  let url = getEnv().api;
  console.log(url)
  let openid = openidCache.get()
  if(openid){
    data.token = 'OPENID_PAT_'+ openid
  }
  // let sign = hex_md5(hex_md5('aAr9MVS9j1') + JSON.stringify(data));
  let axiosConfig = {
    headers: {
      "sign": "test",
      "Content-Type": "application/json"
    },
  }
  return axios.post(url, data, axiosConfig)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
}
