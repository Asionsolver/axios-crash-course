import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const token = "dfjadfdsklfjkldsaf";

// request interceptor
api.interceptors.request.use(
  (config) => {
    // console.log(config)
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // error came from the server
      error.message = `Error from server: status ${error.response.status} - message ${error.response.statusText}`;
    }

    return Promise.reject(error);
  }
);

export default api;
