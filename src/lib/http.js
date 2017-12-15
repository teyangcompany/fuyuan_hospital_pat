import axios from "axios";
import config from "./config"
import {getApiUrl} from "./util"

import {openidCache} from './cache'

export default function (service, options) {
  let baseParams = config.base_params;

  let data = {
    service,
    ...baseParams,
    ...options
  };
  let url = getApiUrl();
  let openid = openidCache.get()
  if(openid){
    data.token = 'OPENID_PAT_'+ openid
  }

  let axiosConfig = {
    headers: {
      "sign": "test",
      "Content-Type": "application/json"
    },
  }
  return axios.post(config.api_url, data, axiosConfig)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
}
