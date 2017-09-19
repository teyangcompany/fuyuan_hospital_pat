import axios from "axios";
import config from "./config"

export default function (service, options, conf) {
  let baseParams = config.base_params;
  let data = {
    service,
    ...baseParams,
    ...options
  };


  let axiosConfig = {
    url: data.mock ? "/api" : config.api_url,
    method: "post",
    headers: {
      "sign": "test",
      "Content-Type": "application/json"
    },
    data: data
  }

  if (conf) {
    axiosConfig = Object.assign({}, axiosConfig, conf);
  }

  return axios(axiosConfig)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
}
