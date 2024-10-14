import axios from "axios";

export const axioser = () => {
  const client = axios.create();
  const token = window.localStorage.getItem("token");

  client.interceptors.request.use(
    (config) => {
      if (config.authorization !== false) {
        if (token) {
          config.headers.Authorization = "Bearer " + token.replaceAll('"', "");
        }
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};
