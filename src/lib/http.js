import axios from "axios";
import config from "./config"

export default function (service, options) {
  let baseParams = config.base_params;
  let data = {
    service,
    ...baseParams,
    ...options
  };
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
