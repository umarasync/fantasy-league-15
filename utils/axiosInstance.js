import axios from "axios";
import store from "../redux/store/index";

let url = process.env.NEXT_PUBLIC_BACKEND_SERVER;

const api = axios.create({
  baseURL: url,
  headers: { Accept: "application/json" },
});

api.setHeader = function (key, value) {
  this.defaults.headers.common[key] = value;
};

// Doing things before request is sent
api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return {
      ...response,
      ok: true,
    };
  },
  function (error) {
    if (error) {
// execute something 
    }

    return {
      ...error.response,
      ok: false,
    };
  }
);

export default api;
