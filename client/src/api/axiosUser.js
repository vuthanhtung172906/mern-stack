import axios from "axios";
import queryString from "query-string";

const axiosClient2 = axios.create({
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient2.interceptors.request.use(async (config) => {
  return config;
});

axiosClient2.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient2;
